import { about } from '../../lib/data';
import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

// Larger, richer SVG icons
const iconPaths: Record<string, string> = {
  layers: '<rect x="11" y="2.5" width="12" height="19" rx="1.5" stroke="#34e89a" stroke-width="1.6"/><path d="M5 12.5l6-3.5 6 3.5-6 3.5z" fill="rgba(52,232,154,0.15)" stroke="#0aff7f" stroke-width="1.5" stroke-linejoin="round"/><path d="M5 17l6-3.5 6 3.5" fill="none" stroke="#0aff7f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  bank: '<path d="M3 21h18M3 10h18M5 6l7-3.5L19 6" fill="none" stroke="#34e89a" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" fill="none" stroke="#0aff7f" stroke-width="1.6" stroke-linecap="round"/>',
  signal: '<circle cx="6" cy="12" r="2.5" fill="rgba(52,232,154,0.3)" stroke="#34e89a" stroke-width="1.6"/><circle cx="12" cy="12" r="2.5" fill="rgba(52,232,154,0.45)" stroke="#0aff7f" stroke-width="1.6"/><circle cx="18" cy="12" r="2.5" fill="rgba(52,232,154,0.3)" stroke="#34e89a" stroke-width="1.6"/><path d="M1.5 12h2.5M20 12h2.5" stroke="#34e89a" stroke-width="1.6" stroke-linecap="round"/>',
  leaf: '<path d="M17.5 7.5C8.5 9.5 6 15.5 3.8 20.8l2 .7 1-2.4c.55.2 1.1.35 1.7.35C15 19.7 20.5 14.5 20.5 7.5c0-1.8-1.3-2-2.5-1.8-2 0-3 .8-3.5 1.8z" fill="rgba(52,232,154,0.25)" stroke="#34e89a" stroke-width="1.6" stroke-linejoin="round"/><circle cx="10.5" cy="13" r="1.1" fill="#0aff7f"/>',
};

export default function Industries() {
  return (
    <div className="mt-14">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        className="mb-8 text-center text-lg text-brand-muted"
      >
        {about.industriesSub}
      </motion.p>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: '-40px' }}
        className="grid grid-cols-2 gap-5 sm:grid-cols-4"
      >
        {about.industries.map((ind) => (
          <motion.div
            key={ind.name}
            variants={cardVariant}
            whileHover={{ y: -6, scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="glass-card glass-shine group flex flex-col items-center gap-4 rounded-card p-8 text-center transition-all duration-300 hover:shadow-xl hover:shadow-brand-accent/10"
          >
            <div className="relative">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-brand-border bg-brand-surface/80 transition-all duration-300 group-hover:scale-110 group-hover:border-brand-accent/50">
                <svg
                  viewBox="0 0 24 24"
                  width="40"
                  height="40"
                  fill="none"
                  dangerouslySetInnerHTML={{ __html: iconPaths[ind.icon] || iconPaths.layers }}
                />
              </div>
            </div>
            <span className="text-lg font-semibold text-brand-text">{ind.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}