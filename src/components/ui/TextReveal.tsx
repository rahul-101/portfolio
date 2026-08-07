import { motion } from 'framer-motion';

interface Props {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  stagger?: number;
  }

export default function TextReveal({ text, className = '', as = 'h2', stagger = 0.07 }: Props) {
  const words = text.split(' ');
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.5 }}
      transition={{ staggerChildren: stagger }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { opacity: 0, y: '0.7em', rotateX: 40 },
              show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}