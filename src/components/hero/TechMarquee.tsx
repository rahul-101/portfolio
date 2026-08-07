import { techLogos } from '../../lib/data';

export default function TechMarquee() {
  const items = [...techLogos, ...techLogos];

  return (
    <div className="marquee-container mt-10 w-full" aria-hidden="true">
      <div className="marquee-track animate-marquee">
        {items.map((src, i) => (
          <span key={i} className="flex h-10 flex-shrink-0 items-center justify-center opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
            <img src={src} alt="" className="max-h-8 max-w-[58px] object-contain" />
          </span>
        ))}
      </div>
    </div>
  );
}