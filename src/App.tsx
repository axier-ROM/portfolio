import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import MoonCanvas from './components/MoonCanvas';
import Navigation from './components/Navigation';

import Hero from './sections/Hero';
import Projects from './sections/Projects';
import About from './sections/About';
import Connect from './sections/Connect';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.6,
      smoothWheel: false,
      syncTouch: false,
    });

    lenisRef.current = lenis;
    let animationFrame = 0;

    function raf(time: number) {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    }

    animationFrame = requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div
      style={{
        background: '#050505',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      {/* Moon background */}
      <MoonCanvas />

      {/* Navigation */}
      <Navigation lenisRef={lenisRef} />

      {/* Main sections */}
      <main>
        <Hero lenisRef={lenisRef} />
        <Projects />
        <About />
        <Connect />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
