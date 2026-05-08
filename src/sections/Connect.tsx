import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Connect() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      elementsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addRef = (index: number) => (el: HTMLElement | null) => {
    elementsRef.current[index] = el;
  };

  return (
    <section
      id="connect"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 10,
        background: '#050505',
        padding: '120px 0 80px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
        <span
          ref={addRef(0)}
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
            transform: 'translateY(30px)',
          }}
        >
          // connect
        </span>
        <h2
          ref={addRef(1)}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 400,
            fontSize: 48,
            color: '#ffffff',
            margin: '0 0 20px 0',
            opacity: 0,
            transform: 'translateY(30px)',
          }}
        >
          Let's build something.
        </h2>
        <p
          ref={addRef(2)}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 18,
            color: '#999999',
            maxWidth: 560,
            lineHeight: 1.6,
            margin: '0 0 48px 0',
            opacity: 0,
            transform: 'translateY(30px)',
          }}
        >
          Open to collaboration on security tools, automation scripts, and experimental web
          projects.
        </p>
        <div
          ref={addRef(3)}
          style={{
            display: 'flex',
            gap: 16,
            opacity: 0,
            transform: 'translateY(30px)',
          }}
        >
          <a
            href="https://github.com/axier-ROM"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit axier-ROM GitHub profile"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 500,
              fontSize: 14,
              color: '#e5e5e5',
              background: 'transparent',
              border: '1px solid #444444',
              padding: '14px 32px',
              borderRadius: 4,
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'border-color 0.2s ease, color 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = '#c8ff00';
              el.style.color = '#c8ff00';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = '#444444';
              el.style.color = '#e5e5e5';
            }}
          >
            GitHub
          </a>
          <a
            href="https://github.com/axier-ROM"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact axier-ROM via GitHub"
            title="Contact via GitHub"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 500,
              fontSize: 14,
              color: '#050505',
              background: '#c8ff00',
              border: '1px solid #c8ff00',
              padding: '14px 32px',
              borderRadius: 4,
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'background 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#d4ff33';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#c8ff00';
            }}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
