import { writing } from '../../lib/data';
import Section from '../ui/Section';
import SpotlightCard from '../ui/SpotlightCard';
import ScrollReveal from '../ui/ScrollReveal';

export default function Writing() {
  return (
    <Section id="writing" label="07 — Writing" title="Notes from the Trenches of AI & Automation.">
      <div className="grid gap-5 sm:grid-cols-2">
        {writing.map((w, i) => (
          <SpotlightCard key={w.title}>
            <ScrollReveal delay={i * 0.05}>
              <span className="mb-3 inline-block rounded-full bg-brand-amber/10 px-3 py-1 font-mono text-xs text-brand-amber">{w.tag}</span>
              <h3 className="mb-2 font-display font-semibold text-brand-text">{w.title}</h3>
              <p className="mb-3 text-base leading-relaxed text-brand-muted">{w.desc}</p>
              <p className="font-mono text-sm text-brand-muted">{w.meta}</p>
            </ScrollReveal>
          </SpotlightCard>
        ))}
      </div>
    </Section>
  );
}