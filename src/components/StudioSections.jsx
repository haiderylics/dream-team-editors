import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Quote, UserRound } from "lucide-react";
import gsap from "gsap";
import { stats, team, testimonials } from "../data/content";
import "./StudioSections.css";

export function Achievements({ paused = false }) {
  const section = useRef(null);
  useEffect(() => {
    const elementRoot = section.current;
    const resetCounts = () => elementRoot.querySelectorAll("[data-count]").forEach((el) => { el.textContent = el.dataset.count; });
    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (paused) return;
        elementRoot.querySelectorAll("[data-count]").forEach((element) => {
          const target = Number(element.dataset.count);
          const counter = { value: 0 };
          gsap.to(counter, {
            value: target, duration: 1.8, ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
            onStart: () => { element.textContent = "0"; },
            onUpdate: () => { element.textContent = Math.round(counter.value).toLocaleString("en-US"); },
            onComplete: () => { element.textContent = String(target); },
          });
        });
        return resetCounts;
      });
    }, section);
    return () => {
      context.revert();
      resetCounts();
    };
  }, [paused]);
  return (
    <section id="achievements" className="section achievements" ref={section}>
      <div className="wrap">
        <div className="section-head reveal">
          <div><span className="eyebrow"><span className="section-index">04</span>Achievements</span>
            <h2>Every story.<br /><em>A little further.</em></h2></div>
          <p className="achievement-intro">The years, the projects and the people behind Dream Team Editors.</p>
        </div>
        <div className="achievement-grid">
          {stats.map((stat, index) => (
            <article className="achievement-card" key={stat.label}>
              <span className="achievement-caption"><span>0{index + 1}</span>{stat.caption}</span>
              {typeof stat.value === "number" ? (
                <strong className="achievement-value" aria-label={`${stat.value}${stat.suffix}`}>
                  <span aria-hidden="true" data-count={stat.value}>{stat.value}</span><span aria-hidden="true" className="count-plus">{stat.suffix}</span>
                </strong>
              ) : <strong className="achievement-world"><span>{stat.value}</span></strong>}
              <p>{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const item = testimonials[index];
  const change = (direction) => setIndex((i) => (i + direction + testimonials.length) % testimonials.length);
  return (
    <section id="testimonials" className="section wrap client-stories">
      <div className="section-head reveal">
        <div><span className="eyebrow"><span className="section-index">03</span>Testimonials</span>
          <h2>Good work.<br /><em>Better connections.</em></h2></div>
        <p className="testimonial-demo">Sample testimonials · awaiting client approval</p>
      </div>
      <div className="testimonial-stage" role="region" aria-roledescription="carousel" aria-label="Testimonials"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); change(e.key === "ArrowRight" ? 1 : -1); }
        }}>
        <div className="testimonial-feature" aria-live="polite" aria-atomic="true">
          <div className="testimonial-top"><Quote size={40} strokeWidth={1.2} aria-hidden="true" /><span>THE COLLABORATION / 0{index + 1}</span></div>
          <div key={index} className="testimonial-text" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${testimonials.length}`}>
            <blockquote>{item.quote}</blockquote>
            <div className="testimonial-person"><span className="client-monogram" aria-hidden="true">{item.name.charAt(0)}</span><div><strong>{item.name}</strong><span>{item.role} · Sample</span></div></div>
          </div>
          <div className="testimonial-controls">
            <div className="testimonial-dots" aria-label="Choose testimonial">{testimonials.map((t, i) => <button key={t.name} aria-label={`Show testimonial ${i + 1}`} aria-pressed={i === index} onClick={() => setIndex(i)}><span /></button>)}</div>
            <div className="carousel-buttons"><button className="icon-btn" aria-label="Previous testimonial" onClick={() => change(-1)}><ChevronLeft /></button><button className="icon-btn" aria-label="Next testimonial" onClick={() => change(1)}><ChevronRight /></button></div>
          </div>
        </div>
        <div className="testimonial-list" aria-label="Collaboration types">
          {testimonials.map((t, i) => <button className={`testimonial-choice ${index === i ? "selected" : ""}`} key={t.name} aria-pressed={index === i} onClick={() => setIndex(i)}>
            <span className="choice-number">0{i + 1}</span><span><strong>{t.name}</strong><small>{t.role}</small></span><Plus size={20} aria-hidden="true" />
          </button>)}
          <p>Different stories.<br /><span>The same attention to detail.</span></p>
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member }) {
  const [expanded, setExpanded] = useState(false);
  const reset = (e) => { e.currentTarget.style.setProperty("--rx", "0deg"); e.currentTarget.style.setProperty("--ry", "0deg"); };
  return (
    <article className={`team-card ${expanded ? "expanded" : ""}`} onPointerLeave={reset}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--rx", `${-(e.clientY - r.top - r.height / 2) / r.height * 5}deg`);
        e.currentTarget.style.setProperty("--ry", `${(e.clientX - r.left - r.width / 2) / r.width * 7}deg`);
      }}>
      <div className="team-portrait">
        {member.image ? <img src={member.image} alt={`AI-generated placeholder portrait for ${member.role}`} loading="lazy" /> : <div className="team-photo-placeholder"><UserRound size={88} strokeWidth={0.8} aria-hidden="true" /><span>Photo coming soon</span></div>}
        <span className="team-number">DTE / {member.id}</span>
        <span className="team-specialty">{member.specialty}</span>
      </div>
      <div className="team-info"><span className="team-role">{member.role}</span><h3>{member.name}</h3>
        <button className="team-toggle" aria-expanded={expanded} aria-controls={`team-bio-${member.id}`} onClick={() => setExpanded(!expanded)} aria-label={`${expanded ? "Hide" : "View"} profile for ${member.name}`}><Plus size={20} /><span>{expanded ? "Close profile" : "View profile"}</span></button>
        <div id={`team-bio-${member.id}`} className="team-bio" hidden={!expanded}><p>{member.bio}</p></div>
      </div>
    </article>
  );
}

export function MeetUs() {
  return (
    <section id="meet-us" className="section wrap meet-us">
      <div className="section-head reveal">
        <div><span className="eyebrow"><span className="section-index">05</span>Meet Us</span><h2>Four creatives.<br /><em>One Dream Team.</em></h2></div>
        <div className="team-intro"><p>The people behind the frame. A shared love of storytelling, with a different eye for every detail.</p><span className="team-demo">AI-generated placeholder portraits · real team profiles coming soon</span></div>
      </div>
      <div className="team-grid">{team.map((member) => <TeamCard key={member.id} member={member} />)}</div>
    </section>
  );
}
