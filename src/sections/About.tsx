import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  percentage: number;
  color: string;
}

const skills: Skill[] = [
  { name: 'Python', percentage: 75, color: '#c8ff00' },
  { name: 'Cyber-Security', percentage: 60, color: '#ff6b35' },
];

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: '3', label: 'Repositories' },
  { value: '23', label: 'Contributions' },
  { value: '2', label: 'Languages' },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(leftRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      gsap.to(rightRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 10,
        background: 'rgba(5,5,5,0.95)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: '160px 0',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 40px',
          display: 'grid',
          gridTemplateColumns: '40fr 60fr',
          gap: 80,
          alignItems: 'start',
        }}
      >
        {/* Left column */}
        <div
          ref={leftRef}
          style={{
            opacity: 0,
            transform: 'translateX(-30px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <span
            style={{
              display: 'block',
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 500,
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#c8ff00',
              marginBottom: 32,
            }}
          >
            // about
          </span>
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid #333333',
              marginBottom: 24,
            }}
          >
            <img
              src="img-avatar.jpg"
              alt="axier-ROM avatar"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 500,
              fontSize: 24,
              color: '#ffffff',
              margin: '0 0 8px 0',
            }}
          >
            Or 1 = 1 —
          </p>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 400,
              fontSize: 14,
              color: '#999999',
              margin: 0,
            }}
          >
            @axier-ROM
          </p>
        </div>

        {/* Right column */}
        <div
          ref={rightRef}
          style={{
            opacity: 0,
            transform: 'translateX(30px)',
            paddingTop: 44,
          }}
        >
          <h3
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 400,
              fontSize: 28,
              color: '#ffffff',
              margin: '0 0 32px 0',
            }}
          >
            Currently Learning
          </h3>

          {/* Skills with progress bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 60 }}>
            {skills.map((skill) => (
              <div key={skill.name}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 400,
                      fontSize: 14,
                      color: '#e5e5e5',
                    }}
                  >
                    {skill.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 400,
                      fontSize: 14,
                      color: '#999999',
                    }}
                  >
                    {skill.percentage}%
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: 4,
                    background: '#1a1a1a',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${skill.percentage}%`,
                      height: '100%',
                      background: skill.color,
                      borderRadius: 2,
                      transition: 'width 1s ease-out',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <h3
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 400,
              fontSize: 28,
              color: '#ffffff',
              margin: '0 0 20px 0',
            }}
          >
            Interests
          </h3>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 16,
              color: '#999999',
              lineHeight: 1.6,
              margin: '0 0 60px 0',
            }}
          >
            Automation tooling, browser extensions, system utilities, and the art of clean,
            purposeful code. Fascinated by the intersection of security and usability. Building
            small tools that solve real problems.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 48 }}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                    fontSize: 36,
                    color: '#ffffff',
                    margin: '0 0 4px 0',
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: 13,
                    color: '#999999',
                    margin: 0,
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
