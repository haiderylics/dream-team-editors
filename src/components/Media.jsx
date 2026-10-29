import { useEffect, useRef, useState } from "react";
import { Play, Pause, X, ChevronLeft, ChevronRight } from "lucide-react";

import imageSizes from "../data/image-sizes.json";

export function Picture({
  src,
  alt,
  className = "",
  priority = false,
  ...props
}) {
  const responsive = Boolean(imageSizes[src]);
  const widths = imageSizes[src];
  return (
    <img
      src={src}
      srcSet={
        responsive
          ? `${src.replace(".webp", "-480.webp")} ${widths[0]}w, ${src.replace(".webp", "-900.webp")} ${widths[1]}w, ${src} ${widths[2]}w`
          : undefined
      }
      sizes={
        priority
          ? "100vw"
          : "(max-width: 540px) 100vw, (max-width: 800px) 50vw, 60vw"
      }
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      {...props}
    />
  );
}
export function AmbientVideo({ src, poster, className = "", paused = false }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const video = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = navigator.connection;
    let visible = false;
    const sync = () => {
      if (
        visible &&
        !document.hidden &&
        !paused &&
        !reduced.matches &&
        !connection?.saveData
      ) {
        if (!video.src) {
          video.src = src;
          video.load();
        }
        video.play().catch(() => {});
      } else video.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      video.pause();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, [src, paused]);
  return (
    <video
      ref={ref}
      className={`${className} ${ready ? "video-ready" : ""}`}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      onLoadedData={() => setReady(true)}
    />
  );
}
export function ProjectCard({ project, onOpen, index }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      className={`project-card project-${index % 4}`}
      onClick={() => onOpen(project)}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHover(true);
      }}
      onPointerLeave={() => setHover(false)}
      aria-label={`View ${project.title}, ${project.category} demo`}
    >
      <div className="project-image">
        <Picture src={project.image} alt={project.title} />
        {hover && project.video && (
          <AmbientVideo src={project.video} poster={project.image} />
        )}
        <span className="project-num">
          {String(index + 1).padStart(2, "0")} / DTE
        </span>
        <span className="project-play">
          <Play size={19} fill="currentColor" />
        </span>
        <span className="project-demo">Stock concept</span>
      </div>
      <div className="project-caption">
        <h3>{project.title}</h3>
        <span>{project.format}</span>
      </div>
    </button>
  );
}
export function Lightbox({ item, items = [], onClose, onChange }) {
  const dialog = useRef(null);
  const previous = useRef(null);
  const index = items.findIndex((x) => x.id === item.id);
  const move = (direction) =>
    onChange?.(items[(index + direction + items.length) % items.length]);
  useEffect(() => {
    previous.current = document.activeElement;
    dialog.current.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
      previous.current?.focus();
    };
  }, []);
  return (
    <dialog
      className="lightbox"
      ref={dialog}
      aria-labelledby="lightbox-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (items.length > 1 && e.key === "ArrowRight") move(1);
        if (items.length > 1 && e.key === "ArrowLeft") move(-1);
      }}
    >
      <div className="lightbox-inner">
        <button
          className="icon-btn close-dialog"
          onClick={onClose}
          aria-label="Close viewer"
        >
          <X />
        </button>
        {item.video ? (
          <video
            key={item.id}
            src={item.video}
            poster={item.image}
            controls
            autoPlay
            playsInline
            preload="metadata"
            aria-label={item.title}
          />
        ) : (
          <Picture src={item.image} alt={item.alt || item.title} priority />
        )}
        <div className="lightbox-meta">
          <div>
            <span className="eyebrow">
              {item.category || item.type || "Showreel"} · Demo stock media
            </span>
            <h2 id="lightbox-title">{item.title}</h2>
            {item.description && <p>{item.description}</p>}
          </div>
          {items.length > 1 && (
            <div className="carousel-buttons">
              <button
                className="icon-btn"
                onClick={() => move(-1)}
                aria-label="Previous image"
              >
                <ChevronLeft />
              </button>
              <span>
                {index + 1} / {items.length}
              </span>
              <button
                className="icon-btn"
                onClick={() => move(1)}
                aria-label="Next image"
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
export function MotionToggle({ paused, onClick }) {
  return (
    <button
      className="motion-toggle"
      onClick={onClick}
      aria-label={paused ? "Play background video" : "Pause background video"}
    >
      {paused ? <Play size={14} /> : <Pause size={14} />}
      <span>{paused ? "Play video" : "Pause video"}</span>
    </button>
  );
}
