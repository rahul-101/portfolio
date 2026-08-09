import { about } from '../../lib/data';
import Section from '../ui/Section';
import ScrollReveal from '../ui/ScrollReveal';
import Stats from './Stats';
import Industries from './Industries';
import Testimonials from './Testimonials';

export default function About({ delay = 0 }: { delay?: number }) {
  return (
    <Section id="about" label={about.label} title={about.title}>
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        <div className="flex-1">
          <ScrollReveal delay={delay}>
            <div className="space-y-5 text-brand-muted leading-relaxed">
              {about.paragraphs.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={delay + 0.15}>
            <div className="mt-14 pt-8 border-t border-brand-border">
              <Stats />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={delay + 0.3}>
            <Industries />
          </ScrollReveal>

          {/* Three pillars */}
          <ScrollReveal delay={delay + 0.45}>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {about.pillars.map((p) => (
                <div key={p.title} className="glass-card glass-shine rounded-card p-5">
                  <h4 className="mb-2 font-display font-semibold text-brand-amber">{p.title}</h4>
                  <p className="text-sm leading-relaxed text-brand-muted">{p.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      <Testimonials />
    </Section>
  );
}