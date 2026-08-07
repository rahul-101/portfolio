import { ReactNode } from 'react';
import TextReveal from './TextReveal';
import ScrollReveal from './ScrollReveal';

interface Props {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
}

export default function Section({ id, label, title, children }: Props) {
  return (
    <section id={id} className="relative z-10 px-5 py-20 md:px-16">
      <div className="mx-auto max-w-[1280px]">
        <ScrollReveal delay={0} className="mb-3 text-center">
          <span className="section-label">{label}</span>
        </ScrollReveal>
        <TextReveal text={title} as="h2" className="section-title mx-auto mb-10 max-w-[720px] text-center" />
        {children}
      </div>
    </section>
  );
}