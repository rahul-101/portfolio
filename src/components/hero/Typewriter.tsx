import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  prefix: string;
  roles: string[];
}

// Premium word-rotation typewriter with slide + blur transitions
export default function Typewriter({ prefix, roles }: Props) {
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Cycle through roles every 2.4 seconds
    timer.current = setInterval(() => {
      setIdx((i) => (i + 1) % roles.length);
    }, 2400);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [roles.length]);

  return (
    <span className="inline-flex items-baseline flex-wrap justify-center">
      <span className="font-display font-semibold text-brand-text mr-2">{prefix}</span>
      <span className="relative inline-block min-w-[260px] overflow-hidden align-bottom text-left">
        <AnimatePresence mode="wait">
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            className="inline-block gradient-text-animated font-display font-bold text-brand-accent"
          >
            {roles[idx]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}