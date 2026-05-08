import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  tags: string[];
  description: string;
  image: string;
  link: string;
  reversed: boolean;
}

const projects: Project[] = [
  {
    title: 'YouTube Reskin',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description:
      'Complete YouTube interface redesign with AI-inspired aesthetics. Features two themes — Astral-UI (Gemini-inspired dark purple space theme) and Copper-UI (Claude-inspired warm copper theme). Lightweight, fast, and tracking-free.',
    image: '/img-youtube-reskin.jpg',
    link: 'https://github.com/axier-ROM/YouTube-Reskin',
    reversed: false,
  },
  {
    title: 'SimpleOrganizer',
    tags: ['Python'],
    description:
      'Auto Folder Organizer — a lightweight Python script that monitors a folder and automatically sorts files into categorized subfolders by type. Images, videos, documents, audio, code, archives, and installers — each finds its place. Runs on a schedule, respects system directories.',
    image: '/img-simple-organizer.jpg',
    link: 'https://github.com/axier-ROM/SimpleOrganizer',
    reversed: true,
  },
  {
    title: 'pdftopngsm',
    tags: ['HTML', 'JavaScript'],
    description:
      'A clean, client-side PNG to PDF converter. Simple web interface — drag, convert, download. No server needed, no data leaves the browser. Built with vanilla HTML and JavaScript.',
    image: '/img-pdftopngsm.jpg',
    link: 'https://github.com/axier-ROM/pdftopngsm',
    reversed: false,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Card animations
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 10,
        background: 'rgba(5,5,5,0.92)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: '160px 0',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
        {/* Section heading */}
        <div
          ref={headingRef}
          style={{ opacity: 0, transform: 'translateY(40px)', marginBottom: 80 }}
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
              marginBottom: 16,
            }}
          >
            // selected work
          </span>
          <h2
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 400,
              fontSize: 36,
              color: '#ffffff',
              margin: 0,
            }}
          >
            Projects
          </h2>
        </div>

        {/* Project cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => { cardRefs.current[index] = el; }}
              style={{
                opacity: 0,
                transform: 'translateY(60px)',
                display: 'grid',
                gridTemplateColumns: project.reversed ? '45fr 55fr' : '55fr 45fr',
                gap: 48,
                alignItems: 'center',
                borderLeft: '2px solid transparent',
                paddingLeft: 24,
                transition: 'border-color 0.3s ease',
                direction: project.reversed ? 'rtl' : 'ltr',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderLeftColor = '#c8ff00';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent';
              }}
            >
              {/* Image */}
              <div
                style={{
                  direction: 'ltr',
                  overflow: 'hidden',
                  borderRadius: 4,
                  aspectRatio: '16/9',
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease-out',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.transform = 'scale(1.03)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.transform = 'scale(1)';
                  }}
                />
              </div>

              {/* Text content */}
              <div style={{ direction: 'ltr' }}>
                <h3
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 500,
                    fontSize: 24,
                    color: '#ffffff',
                    margin: '0 0 16px 0',
                  }}
                >
                  {project.title}
                </h3>
                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    marginBottom: 16,
                    flexWrap: 'wrap',
                  }}
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 400,
                        fontSize: 11,
                        color: '#050505',
                        background: '#c8ff00',
                        padding: '4px 10px',
                        borderRadius: 2,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: 16,
                    color: '#999999',
                    lineHeight: 1.6,
                    margin: '0 0 20px 0',
                  }}
                >
                  {project.description}
                </p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 400,
                    fontSize: 13,
                    color: '#c8ff00',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.opacity = '0.7';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.opacity = '1';
                  }}
                >
                  View on GitHub →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
