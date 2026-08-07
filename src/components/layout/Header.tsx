import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { navLinks } from '../../lib/data';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const pos = window.scrollY + 120;
      let current = '';
      document.querySelectorAll('section[id]').forEach((s) => {
        const el = s as HTMLElement;
        if (pos >= el.offsetTop) current = s.id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      className={clsx(
        'fixed inset-x-0 top-0 z-[100] transition-colors duration-300',
        scrolled ? 'glass-card !rounded-none !border-x-0 !border-t-0' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3 md:px-16">
        <a href="#hero" className="font-display text-lg font-bold text-brand-text">
          RB<span className="text-brand-amber">.</span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={clsx(
                'text-[0.95rem] font-medium transition-colors hover:text-brand-amber',
                active === l.href.slice(1) ? 'text-brand-amber' : 'text-brand-muted',
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span className={clsx('h-0.5 w-5 rounded bg-brand-text transition-transform', menuOpen && 'translate-y-2 rotate-45')} />
            <span className={clsx('h-0.5 w-5 rounded bg-brand-text transition-opacity', menuOpen && 'opacity-0')} />
            <span className={clsx('h-0.5 w-5 rounded bg-brand-text transition-transform', menuOpen && '-translate-y-2 -rotate-45')} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-brand-border lg:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-brand-muted hover:bg-brand-surface hover:text-brand-amber"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
    </motion.header>
  );
}