import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function GradientText({ children, className = '' }: Props) {
  return (
    <motion.span
      className={`gradient-text-animated bg-[length:200%_200%] ${className}`}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
      transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    >
      {children}
    </motion.span>
  );
}