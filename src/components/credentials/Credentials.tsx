import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { certifications, education, awards } from '../../lib/data';
import Section from '../ui/Section';
import ScrollReveal from '../ui/ScrollReveal';

// Premium coverflow carousel for certifications
function CertCarousel() {
  const [active, setActive] = useState(0);
  const total = certifications.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const visualCount = 5; // how many cards to render around center

  const go = (dir: number) => setActive((a) => (a + dir + total) % total);

  const onDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
    isDragging.current = true;
  };
  const onDragEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging.current) return;
    const endX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const delta = endX - startX.current;
    if (delta > 50) go(-1);
    else if (delta < -50) go(1);
    isDragging.current = false;
  };

  return (
    <div className="flex flex-col items-center">
      {/* Carousel stage */}
      <div
        ref={containerRef}
        className="relative flex h-[220px] w-full cursor-grab items-center justify-center select-none active:cursor-grabbing"
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
        onMouseLeave={() => (isDragging.current = false)}
        onTouchStart={onDragStart}
        onTouchEnd={onDragEnd}
      >
        {/* Decorative glow behind active card */}
        <div className="absolute left-1/2 top-1/2 h-40 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-amber/15 blur-3xl" aria-hidden="true" />

        {certifications.map((c, i) => {
          let offset = i - active;
          if (offset < -Math.floor(total / 2)) offset += total;
          if (offset > Math.floor(total / 2)) offset -= total;

          const abs = Math.abs(offset);
          if (abs > Math.floor(visualCount / 2)) return null;

          const scale = 1 - abs * 0.14;
          const zIndex = 100 - abs;
          const x = offset * 220;
          const opacity = 1 - abs * 0.25;

          return (
            <motion.div
              key={i}
              className="glass-card glass-shine absolute w-[300px] max-w-[78vw] rounded-card p-5 text-center"
              initial={false}
              animate={{ x, scale, opacity, zIndex }}
              transition={{ type: 'spring', stiffness: 250, damping: 28 }}
              whileHover={{ y: -4 }}
              onClick={() => setActive(i)}
              style={{ flexShrink: 0 }}
            >
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-brand-surface">
                <img src={c.icon} alt={c.provider} className="h-full w-full object-contain p-1.5" loading="lazy" />
              </div>
              <p className="mb-1 text-base font-semibold leading-snug text-brand-text">{c.name}</p>
              <p className="font-mono text-sm text-brand-muted">
                {c.provider}{c.year ? ` · ${c.year}` : ''}
              </p>
              {c.verify && (
                <a
                  href={c.verify}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-3 inline-flex items-center gap-1 rounded-full bg-brand-amber/15 px-3 py-1 font-mono text-[0.65rem] text-brand-amber hover:bg-brand-amber/25"
                >
                  Verify ↗
                </a>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center gap-6">
        <button onClick={() => go(-1)} aria-label="Previous certification"
          className="glass-card flex h-11 w-11 items-center justify-center rounded-full text-brand-text transition-transform hover:scale-105 active:scale-95">
          →<span className="rotate-180">←</span>
        </button>
        <span className="font-mono text-xs text-brand-muted">{active + 1} / {total}</span>
        <button onClick={() => go(1)} aria-label="Next certification"
          className="glass-card flex h-11 w-11 items-center justify-center rounded-full text-brand-text transition-transform hover:scale-105 active:scale-95">
          →
        </button>
      </div>
    </div>
  );
}

export default function Credentials() {
  return (
    <Section id="credentials" label="03 — Credentials" title="Certified, Educated, Recognised.">
      <ScrollReveal>
        <h3 className="mb-6 text-center font-display text-xl font-semibold text-brand-text">
          Certifications <span className="font-mono text-sm text-brand-amber">{certifications.length}</span>
        </h3>
        <CertCarousel />
      </ScrollReveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {/* Education */}
        <ScrollReveal>
          <div className="glass-card glass-shine rounded-card p-6">
            <h3 className="mb-4 font-display font-semibold text-brand-text">Education</h3>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-brand-border bg-brand-surface" style={{ backgroundColor: education.bg }}>
                <img src={education.icon} alt="GNIT" className="h-full w-full object-contain p-1" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-text">{education.degree}</p>
                <p className="font-mono text-xs text-brand-muted">{education.school} · {education.years}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Awards */}
        <ScrollReveal delay={0.06}>
          <div className="glass-card glass-shine rounded-card p-6">
            <h3 className="mb-4 font-display font-semibold text-brand-text">Awards</h3>
            <div className="space-y-4">
              {awards.map((a) => (
                <div key={a.title} className="flex items-start gap-3">
                  <span className="mt-0.5 text-lg text-brand-amber">★</span>
                  <div>
                    <p className="text-sm font-semibold text-brand-text">{a.title}</p>
                    <p className="text-xs text-brand-muted">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}