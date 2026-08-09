import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { skillCategories, strengths } from '../../lib/data';
import Section from '../ui/Section';
import ScrollReveal from '../ui/ScrollReveal';

function SkillBar({ name, icon, level }: { name: string; icon: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.45 }}
      className="flex items-center gap-3"
    >
      <div className="h-7 w-7 flex-shrink-0 overflow-hidden rounded bg-brand-bg/80 p-0.5">
        <img src={icon} alt={name} className="h-full w-full object-contain" loading="lazy" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="mb-1.5 text-base text-brand-text">{name}</p>
        <div ref={ref} className="relative h-2 overflow-hidden rounded-full bg-brand-bg/70">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-amber to-brand-rose"
            initial={{ width: '0%' }}
            animate={inView ? { width: `${level}%` } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Shimmer sweeps across once the bar fills */}
          {inView && (
            <motion.div
              className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '400%' }}
              transition={{ duration: 1.6, ease: 'easeInOut', delay: 1.4 }}
            />
          )}
        </div>
      </div>
    </motion.li>
  );
}

const cardVariant = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Skills({ delay = 0 }: { delay?: number }) {
  return (
    <Section id="skills" label="02 — Skills" title="The Toolkit Behind the Results." delay={delay}>
      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: delay } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: '-40px' }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillCategories.map((cat) => (
          <motion.div key={cat.title} variants={cardVariant}>
            <motion.div
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="glass-card glass-shine spotlight-card rounded-card p-7 transition-all duration-300 hover:shadow-xl hover:shadow-brand-accent/10"
            >
              <h3 className="mb-5 font-display text-lg font-semibold text-brand-text">{cat.title}</h3>
              <ul className="space-y-3.5">
                {cat.skills.map((s) => (
                  <SkillBar key={s.name} {...s} />
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <ScrollReveal delay={0.1}>
        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {strengths.map((s) => (
            <span key={s} className="rounded-full bg-brand-surface/60 px-5 py-2 font-mono text-sm text-brand-muted transition-all duration-200 hover:bg-brand-amber/10 hover:text-brand-amber">{s}</span>
          ))}
        </div>
      </ScrollReveal>
    </Section>
  );
}