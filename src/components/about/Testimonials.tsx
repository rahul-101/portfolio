import { testimonials, endorseChips } from '../../lib/data';
import ScrollReveal from '../ui/ScrollReveal';

export default function Testimonials() {
  return (
    <div className="mt-20">
      <h3 className="mb-8 text-center font-display text-2xl font-bold text-brand-text">Endorsements from LinkedIn</h3>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 0.06}>
            <blockquote className="glass-card glass-shine relative flex h-full flex-col justify-between rounded-card p-7">
              <p className="mb-4 text-base leading-relaxed text-brand-muted">"{t.quote}"</p>
              <footer className="flex items-center gap-3">
                <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-brand-border">
                  <img src={t.avatar} alt={t.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-brand-text">{t.name}</p>
                  <p className="font-mono text-xs text-brand-muted">{t.role}, {t.company}</p>
                  <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-brand-amber hover:underline">LinkedIn</a>
                </div>
              </footer>
            </blockquote>
          </ScrollReveal>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {endorseChips.map((c) => (
          <span key={c} className="rounded-full bg-brand-surface px-3 py-1.5 font-mono text-xs text-brand-muted">{c}</span>
        ))}
      </div>
    </div>
  );
}