import { useEffect, useRef } from 'react';
import { useInView, motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface Props {
  value: number;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({ value, suffix = '', className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString('en-US'));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 1.5, ease: [0.22, 1, 0.36, 1] as const });
      return () => controls.stop();
    }
  }, [inView, count, value]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}