import type { RefObject } from 'react';
import type Lenis from 'lenis';

interface NavigationProps {
  lenisRef: RefObject<Lenis | null>;
}

export default function Navigation({ lenisRef }: NavigationProps) {
  const scrollTo = (target: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: 0 });
    }
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(5,5,5,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 40px',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button
          onClick={() => scrollTo('#hero')}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
            fontSize: 14,
            color: '#e5e5e5',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          axier-ROM
        </button>
        <div style={{ display: 'flex', gap: 32 }}>
          {[
            { label: 'Projects', target: '#projects' },
            { label: 'About', target: '#about' },
            { label: 'Connect', target: '#connect' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.target)}
              className="nav-link"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 400,
                fontSize: 13,
                color: '#999999',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = '#c8ff00';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = '#999999';
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
