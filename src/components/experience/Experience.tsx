import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { timeline } from '../../lib/data';
import Section from '../ui/Section';

export default function Experience({ delay = 0 }: { delay?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.7', 'end 0.5'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <Section id="experience" label="06 — Experience" title="A Track Record of Impact." delay={delay}>
      <div ref={containerRef} className="relative mx-auto max-w-3xl">
        {/* Base timeline rail */}
        <div className="absolute left-[15px] top-0 h-full w-px bg-brand-border" aria-hidden="true" />
        {/* Animated progress fill */}
        <motion.div
          className="absolute left-[15px] top-0 w-px origin-top bg-gradient-to-b from-brand-amber via-brand-rose to-brand-amber"
          style={{ scaleY }}
          aria-hidden="true"
        />

        <div className="space-y-10">
          {timeline.map((t) => (
            <motion.div
              key={t.role + t.date}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              className="group relative flex gap-6"
            >
              {/* Node dot */}
              <div className="absolute left-[11px] top-7 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-brand-amber shadow-[0_0_0_4px_rgba(201,130,60,0.15)] transition-transform group-hover:scale-150" aria-hidden="true" />

              {/* Card */}
              <div className="flex-1 pl-10">
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                  className="glass-card glass-shine rounded-card p-6 transition-shadow hover:shadow-xl hover:shadow-brand-amber/10"
                >
                  <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-lg font-bold text-brand-text">{t.role}</h3>
                    <span className="font-mono text-xs text-brand-amber">{t.date}</span>
                  </div>

                  <div className="mb-3 flex flex-wrap items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-md border border-brand-border bg-brand-surface p-1">
                      <img src={t.orgLogo} alt={t.org} className="h-full w-full object-contain" loading="lazy" />
                    </span>
                    <span className="text-base font-medium text-brand-text">{t.org}</span>
                    <span className="rounded-full border border-brand-border bg-brand-surface px-3 py-0.5 font-mono text-xs text-brand-muted">{t.tag}</span>
                  </div>

                  <ul className="space-y-2.5 text-base leading-relaxed text-brand-muted">
                    {t.points.map((p, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + j * 0.08, duration: 0.5 }}
                        className="relative pl-6"
                      >
                        <span className="absolute left-0 top-[0.5em] font-semibold leading-none text-brand-amber" aria-hidden="true">→</span>
                        <span dangerouslySetInnerHTML={{ __html: p }} />
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}