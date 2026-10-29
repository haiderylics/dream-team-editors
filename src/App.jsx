import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Play,
  Plus,
  ChevronLeft,
  ChevronRight,
  Aperture,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  siteConfig,
  navigation,
  marquee,
  services,
  reels,
  contactDetails,
  socialLinks,
  whatsappUrl,
} from "./data/content";
import {
  AmbientVideo,
  MotionToggle,
  Picture,
  Lightbox,
} from "./components/Media";
import WhatsAppIcon from "./components/WhatsAppIcon";
import { Achievements, MeetUs, Testimonials } from "./components/StudioSections";
const Contact = lazy(() => import("./components/Contact"));
gsap.registerPlugin(ScrollTrigger);

function Logo() {
  return (
    <a className="logo" href="#home" aria-label={`${siteConfig.name} home`}>
      <img src={siteConfig.logo} width="47" height="47" alt="DTE logo" />
      <span>DREAM TEAM EDITORS</span>
    </a>
  );
}
function SectionHead({ number, label, title, description, children }) {
  return (
    <div className="section-head reveal">
      <div>
        <span className="eyebrow">
          <span className="section-index">{number}</span>
          {label}
        </span>
        <h2>{title}</h2>
      </div>
      <div className="section-description">
        {description && <p>{description}</p>}
        {children}
      </div>
    </div>
  );
}
function Navigation() {
  const menu = useRef(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const button = useRef(null);
  useEffect(() => {
    const change = () => setScrolled(window.scrollY > 40);
    change();
    window.addEventListener("scroll", change, { passive: true });
    return () => window.removeEventListener("scroll", change);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const background = [
      document.querySelector("main"),
      document.querySelector("footer"),
      document.querySelector(".whatsapp-wrap"),
    ].filter(Boolean);
    background.forEach((el) => {
      el.inert = true;
    });
    const close = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
      if (e.key === "Tab") {
        const links = [button.current, ...menu.current.querySelectorAll("a")];
        const first = links[0],
          last = links[links.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previous;
      background.forEach((el) => {
        el.inert = false;
      });
      window.removeEventListener("keydown", close);
    };
  }, [open]);
  return (
    <header
      className={`nav-shell ${scrolled ? "scrolled" : ""} ${open ? "menu-open" : ""}`}
    >
      <nav aria-label="Main navigation">
        <Logo />
        <div className="desktop-links">
          {navigation.map((n) => (
            <a key={n.label} href={n.href}>
              {n.label}
            </a>
          ))}
        </div>
        <button
          ref={button}
          className="icon-btn menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <div ref={menu} id="mobile-menu" className="mobile-menu" hidden={!open}>
        {navigation.map((n, i) => (
          <a key={n.label} href={n.href} onClick={() => setOpen(false)}>
            <span>0{i + 1}</span>
            {n.label}
          </a>
        ))}
        <p>{siteConfig.location}</p>
      </div>
    </header>
  );
}
function Services() {
  return (
    <section id="services" className="section wrap">
      <SectionHead
        number="01"
        label="What we do"
        title={
          <>
            From the first idea.
            <br />
            To the <em>final frame.</em>
          </>
        }
        description="Bring us a brief, a folder of footage, or just a feeling. We'll help you give it form."
      />
      <div className="service-grid">
        {services.map((s) => (
          <article
            className="service-card reveal"
            key={s.group}
            onPointerMove={(e) => {
              if (e.pointerType !== "mouse") return;
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty(
                "--mx",
                `${e.clientX - r.left}px`,
              );
              e.currentTarget.style.setProperty(
                "--my",
                `${e.clientY - r.top}px`,
              );
            }}
          >
            <div className="service-media">
              <Picture src={s.image} alt="" />
              <span>{s.group}</span>
            </div>
            <div className="service-content">
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <ul>
                {s.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <a href="#contact" className="text-link">
                Talk about your project <Plus size={15} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function Reels({ onOpen }) {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "center",
    loop: false,
    containScroll: false,
    startIndex: 2,
  });
  const [index, setIndex] = useState(2);
  useEffect(() => {
    if (!embla) return;
    const sync = () => setIndex(embla.selectedScrollSnap());
    sync();
    embla.on("select", sync);
    return () => embla.off("select", sync);
  }, [embla]);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 801px) and (prefers-reduced-motion: no-preference)",
      () => {
        const tween = gsap.fromTo(
          ".reel-card",
          { x: 80, rotateY: 8 },
          {
            x: -80,
            rotateY: -8,
            ease: "none",
            scrollTrigger: {
              trigger: ".reels-section",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
        return () => {
          tween.scrollTrigger?.kill();
          tween.revert();
        };
      },
    );
    return () => mm.revert();
  }, []);
  return (
    <section className="reels-section section" id="reels">
      <div className="wrap">
        <SectionHead
          number="02"
          label="Small screen. Big energy."
          title={
            <>
              Made for the
              <br />
              <em>stop-scroll-repeat.</em>
            </>
          }
          description="Sharp hooks. Purposeful pacing. Short-form content that feels like you."
        />
      </div>
      <div className="reel-viewport" ref={emblaRef}>
        <div className="reel-track">
          {reels.map((r, i) => (
            <div
              className={`reel-slide ${index === i ? "is-active" : ""}`}
              key={r.id}
            >
              <button
                className="reel-card"
                onClick={() => onOpen(r)}
                aria-label={`View ${r.title} demo`}
              >
                <Picture src={r.image} alt={r.title} />
                <span className="reel-top">
                  <span>DTE / SHORT FORM</span>
                  <Aperture size={16} />
                </span>
                <span className="reel-title">{r.title}</span>
                <span className="reel-bottom">
                  <span>
                    {r.type}
                    <small>Stock concept</small>
                  </span>
                  <span className="round-play">
                    <Play size={17} fill="currentColor" />
                  </span>
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="reel-controls wrap">
        <span>9:16 STORIES / LIMITLESS POSSIBILITIES</span>
        <div className="carousel-buttons">
          <button
            className="icon-btn"
            onClick={() => embla?.scrollPrev()}
            disabled={index === 0}
            aria-label="Previous reel"
          >
            <ChevronLeft />
          </button>
          <span>
            0{index + 1} / 0{reels.length}
          </span>
          <button
            className="icon-btn"
            onClick={() => embla?.scrollNext()}
            disabled={index === reels.length - 1}
            aria-label="Next reel"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
function App() {
  const [viewer, setViewer] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [paused, setPaused] = useState(false);
  const root = useRef(null);
  const open = (item, items = []) => {
    setGallery(items);
    setViewer(item);
  };
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(".hero-line span", {
          yPercent: 110,
          duration: 1.15,
          stagger: 0.14,
          ease: "power4.out",
          clearProps: "transform",
        });
        gsap.utils
          .toArray(".reveal")
          .forEach((el) =>
            gsap.from(el, {
              y: 36,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 94%", once: true },
              clearProps: "transform,opacity",
            }),
          );
        gsap.to(".hero-media", {
          yPercent: 13,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }, root);
      return () => context.revert();
    });
    return () => mm.revert();
  }, []);
  return (
    <div ref={root} className={paused ? "site motion-paused" : "site"}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <section className="hero" id="home">
          <div className="hero-media">
            <Picture
              src={siteConfig.hero.image}
              alt={siteConfig.hero.alt}
              priority
            />
            <AmbientVideo
              src={siteConfig.hero.video}
              poster={siteConfig.hero.image}
              paused={paused}
            />
          </div>
          <div className="hero-shade" />
          <div className="hero-content wrap">
            <div className="hero-kicker">
              <span>
                <i />
                INDEPENDENT CREATIVE PRODUCTION STUDIO
              </span>
            </div>
            <h1>
              {siteConfig.heroLines.map((line, i) => (
                <span className={`hero-line line-${i}`} key={line}>
                  <span>{line}</span>
                </span>
              ))}
            </h1>
            <div className="hero-bottom">
              <div>
                <p>{siteConfig.intro}</p>
                <div className="hero-actions">
                  <a href="#services" className="button blue">
                    Explore our services
                  </a>
                  <a href="#contact" className="button transparent">
                    Start a project
                  </a>
                </div>
              </div>
            </div>
            <div className="hero-foot">
              <span>BUILT TO BE WATCHED. MADE TO BE REMEMBERED.</span>
              <MotionToggle
                paused={paused}
                onClick={() => setPaused((p) => !p)}
              />
            </div>
          </div>
        </section>
        <div className="marquee" aria-label={marquee.join(", ")}>
          <div className="marquee-track" aria-hidden="true">
            {[...marquee, ...marquee].map((m, i) => (
              <span key={i}>
                {m}
                <b>✳</b>
              </span>
            ))}
          </div>
        </div>
        <Services />
        <Reels onOpen={open} />
        <Testimonials />
        <Achievements paused={paused} />
        <MeetUs />
        <section className="big-cta section">
          <div className="cta-orbit" aria-hidden="true" />
          <div className="wrap">
            <span className="eyebrow">Every great story starts somewhere.</span>
            <h2>
              GOT A STORY?
              <br />
              <em>LET'S MAKE IT MOVE.</em>
            </h2>
            <a href="#contact" className="button white">
              Start a project
            </a>
            <span className="cta-signoff">YOUR VISION. OUR OBSESSION.</span>
          </div>
        </section>
        <Suspense
          fallback={<div className="wrap section">Loading project form…</div>}
        >
          <Contact />
        </Suspense>
      </main>
      <footer className="footer wrap">
        <div className="footer-top">
          <Logo />
          <div className="footer-email">
            <span>LET'S CREATE SOMETHING.</span>
            <a href={`mailto:${contactDetails.email}`}>
              {contactDetails.email}
            </a>
          </div>
          <div className="footer-socials">
            {socialLinks.map((s) =>
              s.url ? (
                <a href={s.url} key={s.label} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ) : (
                <span key={s.label}>
                  {s.label}
                  <small>Coming soon</small>
                </span>
              ),
            )}
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          DREAM TEAM.
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}
          </span>
          <span>{siteConfig.location}</span>
          <a href="#home">Back to top</a>
        </div>
      </footer>
      <div className="whatsapp-wrap">
        <a className="whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer"
          aria-label={`Chat with Dream Team Editors on WhatsApp at ${contactDetails.whatsappDisplay}`}>
          <WhatsAppIcon />
        </a>
      </div>
      {viewer && (
        <Lightbox
          item={viewer}
          items={gallery}
          onClose={() => setViewer(null)}
          onChange={setViewer}
        />
      )}
    </div>
  );
}
export default App;
