import { useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SpotlightCard({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ref.current?.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current?.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{ scale: 1.015 }}
      className={clsx(
        'spotlight-card glass-card glass-shine rounded-card p-6 transition-colors duration-300 hover:border-brand-amber/30',
        className,
      )}
    >
      {children}
    </motion.div>
  );
}