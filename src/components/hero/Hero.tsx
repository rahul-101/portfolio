import { motion, useScroll, useTransform } from 'framer-motion';
import { hero } from '../../lib/data';
import Typewriter from './Typewriter';
import TechMarquee from './TechMarquee';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const itemUp = {
  hidden: { opacity: 0, y: -18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 600], [0, 50]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-28 text-center md:px-16">

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex max-w-[900px] flex-col items-center"
      >
        {/* Profile avatar — large focal point */}
        <motion.div variants={itemUp} className="relative mb-10">
          <motion.div
            className="absolute -inset-8 rounded-[3.5rem] bg-gradient-to-tr from-brand-amber/40 via-brand-rose/25 to-brand-amber/40 blur-3xl opacity-80"
            animate={{ opacity: [0.6, 0.85, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute inset-[-7px] overflow-hidden rounded-[2.8rem]"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0deg, var(--accent) 90deg, transparent 180deg, var(--accent-2) 270deg, transparent 360deg)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            aria-hidden="true"
            initial={false}
          />
          <div className="relative h-[300px] w-[300px] overflow-hidden rounded-[2.5rem] border border-brand-border/40 shadow-2xl shadow-brand-amber/20 sm:h-[340px] sm:w-[300px]">
            <img src="/images/profile.png" alt="Rahul Biswas" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/30 via-transparent to-transparent" aria-hidden="true" />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p variants={item} className="mb-3 font-mono text-[0.82rem] uppercase tracking-[0.3em] text-brand-amber">
          {hero.tagline}
        </motion.p>

        {/* Name */}
        <motion.h1 variants={item} className="hero-name font-display font-extrabold">
          {hero.firstName}{' '}
          <span className="gradient-text-animated inline-block">{hero.lastName}</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.p variants={item} className="mt-5 font-display text-2xl text-brand-muted md:text-3xl">
          <Typewriter prefix={hero.typewriterPrefix} roles={hero.roles} />
        </motion.p>

        {/* Subtitle */}
        <motion.p variants={item} className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-muted md:text-xl">
          {hero.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-brand-amber via-brand-rose to-brand-amber px-9 py-4 text-lg font-semibold text-stone-100 shadow-lg shadow-brand-amber/30 transition-shadow hover:shadow-xl hover:shadow-brand-amber/40"
          >
            View Projects
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-500 group-hover:translate-x-full" aria-hidden="true" />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full border border-brand-border px-9 py-4 text-lg font-semibold text-brand-text transition-colors hover:border-brand-amber/40 hover:bg-brand-surface"
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Meta chips */}
        <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {hero.metaChips.map((chip) => (
            <span key={chip} className="glass-card rounded-full px-5 py-2 font-mono text-sm text-brand-muted">
              {chip}
            </span>
          ))}
        </motion.div>

        {/* Tech marquee */}
        <motion.div variants={item} className="w-full">
          <TechMarquee />
        </motion.div>
      </motion.div>

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-brand-bg to-transparent" aria-hidden="true" />

      {/* Scroll hint */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 z-20"
        aria-label="Scroll to about section"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-brand-border p-1.5"
        >
          <span className="h-2 w-1 rounded-full bg-brand-amber" />
        </motion.div>
      </motion.a>
    </section>
  );
}