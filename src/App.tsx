import { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PremiumBackground from './components/hero/PremiumBackground';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Skills from './components/skills/Skills';
import Credentials from './components/credentials/Credentials';
import Projects from './components/projects/Projects';
import Experience from './components/experience/Experience';
import Writing from './components/writing/Writing';
import Contact from './components/contact/Contact';

export default function App() {
  // Cursor glow (fine pointers only, not reduced motion)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      document.documentElement.style.setProperty('--gx', `${(e.clientX / w) * 100}%`);
      document.documentElement.style.setProperty('--gy', `${(e.clientY / h) * 100}%`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div className="noise-bg hue-shift relative min-h-screen">
      {/* Full-page animated background */}
      <PremiumBackground />

      {/* Cursor glow */}
      <div className="cursor-glow hidden lg:block" aria-hidden="true" />

      <Header />

      <main id="main" className="relative z-10">
        <Hero />
        <About delay={0} />
        <Skills delay={0.2} />
        <Credentials delay={0.4} />
        <Projects delay={0.6} />
        <Experience delay={0.8} />
        <Writing delay={1.0} />
        <Contact delay={1.2} />
      </main>

      <Footer />
    </div>
  );
}