import { motion } from 'framer-motion';
import { contact } from '../../lib/data';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative z-10 border-t border-brand-border px-5 py-10 md:px-16"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-brand-muted">© 2026 Rahul Biswas.</p>
        <div className="flex items-center gap-6 text-sm text-brand-muted">
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand-amber">LinkedIn</a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand-amber">GitHub</a>
          <a href={`mailto:${contact.email}`} className="transition-colors hover:text-brand-amber">Email</a>
        </div>
      </div>
    </motion.footer>
  );
}