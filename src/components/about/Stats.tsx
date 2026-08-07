import { about } from '../../lib/data';
import AnimatedCounter from '../ui/AnimatedCounter';

export default function Stats() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {about.stats.map((s) => (
        <div key={s.label} className="flex flex-col items-center gap-1">
          <span className="font-display text-4xl font-bold text-brand-text">
            <AnimatedCounter value={s.value} />{s.suffix}
          </span>
          <span className="text-center font-mono text-xs text-brand-muted">{s.label}</span>
        </div>
      ))}
    </div>
  );
}