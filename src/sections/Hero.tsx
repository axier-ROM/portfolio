import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import type Lenis from 'lenis';
import gsap from 'gsap';

interface HeroProps {
  lenisRef: RefObject<Lenis | null>;
}

export default function Hero({ lenisRef }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(labelRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
      .to(
        nameRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.3'
      )
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.4'
      )
      .to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.4'
      );

    return () => {
      tl.kill();
    };
  }, []);

  const handleScrollToProjects = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#projects', { offset: 0 });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-end',
        zIndex: 1,
      }}
    >
      {/* Dark overlay for text readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(ellipse at center, transparent 0%, rgba(5,5,5,0.4) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '0 80px 120px',
          maxWidth: 600,
        }}
      >
        <span
          ref={labelRef}
          style={{
            display: 'block',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#c8ff00',
            marginBottom: 16,
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          // developer & security enthusiast
        </span>
        <h1
          ref={nameRef}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 600,
            fontSize: 72,
            color: '#ffffff',
            lineHeight: 1.1,
            margin: '0 0 20px 0',
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          axier-ROM
        </h1>
        <p
          ref={subtitleRef}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 20,
            color: '#999999',
            lineHeight: 1.5,
            maxWidth: 480,
            margin: '0 0 32px 0',
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          Building tools. Breaking things. Learning always.
        </p>
        <button
          ref={ctaRef}
          onClick={handleScrollToProjects}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
            fontSize: 14,
            color: '#c8ff00',
            background: 'none',
            border: 'none',
            borderBottom: '1px solid #c8ff00',
            padding: '4px 0',
            cursor: 'pointer',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'background 0.2s ease, padding 0.2s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.target as HTMLElement;
            el.style.background = 'rgba(200,255,0,0.1)';
            el.style.padding = '4px 12px';
          }}
          onMouseLeave={(e) => {
            const el = e.target as HTMLElement;
            el.style.background = 'none';
            el.style.padding = '4px 0';
          }}
        >
          View Projects
        </button>
      </div>
    </section>
  );
}
