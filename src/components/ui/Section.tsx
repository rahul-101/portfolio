import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import TextReveal from './TextReveal';
import ScrollReveal from './ScrollReveal';

interface Props {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
  delay?: number;
}

export default function Section({ id, label, title, children, delay = 0 }: Props) {
  return (
    <section id={id} className="relative z-10 px-5 py-20 md:px-16">
      <div className="mx-auto max-w-[1280px]">
        <ScrollReveal delay={delay} className="mb-3 text-center">
          <span className="section-label">{label}</span>
        </ScrollReveal>
        <TextReveal text={title} as="h2" className="section-title mx-auto mb-10 max-w-[720px] text-center" delay={delay + 0.15} />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: '-40px' }}
          transition={{ duration: 0.6, delay: delay + 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}