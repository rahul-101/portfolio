import { useRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { personalProjects, professionalProjects } from '../../lib/data';
import type { Project } from '../../lib/data';
import Section from '../ui/Section';
import ScrollReveal from '../ui/ScrollReveal';

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ref.current?.style.setProperty('--ry', `${(px - 0.5) * 5}deg`);
    ref.current?.style.setProperty('--rx', `${(0.5 - py) * 5}deg`);
  };

  const onLeave = () => {
    ref.current?.style.setProperty('--ry', '0deg');
    ref.current?.style.setProperty('--rx', '0deg');
  };

  return (
    <ScrollReveal>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
        className={clsx(
          'glass-card glass-shine flex h-full flex-col rounded-card p-5 sm:p-6',
          'transition-[border-color,box-shadow] duration-300 hover:border-brand-amber/30 hover:shadow-lg',
        )}
        style={{ perspective: '900px', transformStyle: 'preserve-3d' }}
      >
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <h3 className="font-display text-lg font-semibold leading-snug text-brand-text sm:text-base">{project.title}</h3>
          <span className="flex-shrink-0 rounded-full bg-brand-amber/10 px-3 py-1 font-mono text-xs text-brand-amber whitespace-nowrap">{project.tag}</span>
        </div>
        <p className="mb-5 text-base leading-relaxed text-brand-muted">{project.desc}</p>

        {/* Metrics — fixed alignment */}
        <div className="mb-5 grid grid-cols-3 gap-2.5">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="flex min-h-[90px] flex-col items-center justify-center rounded-lg border border-brand-border/60 bg-brand-surface/50 px-2 py-3 text-center backdrop-blur-sm"
            >
              <span className="block w-full font-display text-lg font-bold leading-none text-brand-amber sm:text-xl">
                {m.value}
              </span>
              <span className="mt-2 block font-mono text-[0.65rem] uppercase leading-tight tracking-widest text-brand-muted sm:text-[0.7rem]">
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.badges.map((tech: string) => (
            <span key={tech} className="rounded-full bg-brand-surface px-3 py-1 font-mono text-xs text-brand-muted">
              {tech}
            </span>
          ))}
        </div>

        {/* CTA links */}
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          {project.links?.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 rounded-lg bg-brand-amber/10 px-4 py-2 font-mono text-sm text-brand-amber transition-colors hover:bg-brand-amber/20"
            >
              {link.label}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          ))}
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Projects({ delay = 0 }: { delay?: number }) {
  return (
    <>
      <Section id="projects" label="04 — Personal Projects" title="Building in Public." delay={delay}>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: '-60px' }}
          transition={{ delayChildren: delay }}
          className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2"
        >
          {personalProjects.map((project) => (
            <motion.div key={project.title} variants={item}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section id="professional" label="05 — Professional Projects" title="Delivering At Enterprise Scale." delay={delay + 0.15}>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: '-60px' }}
          transition={{ delayChildren: delay + 0.15 }}
          className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
        >
          {professionalProjects.map((project) => (
            <motion.div key={project.title} variants={item}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </>
  );
}