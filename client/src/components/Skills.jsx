import React, { useState } from 'react';

/* ── SVG brand logos ────────────────────────────────────────────────────── */
const Logo = ({ name, size = 32 }) => {
  const s = size;
  switch (name) {
    case 'React':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s} fill="none">
          <circle cx="12" cy="12" r="2.05" fill="#61DAFB"/>
          <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" fill="none"/>
          <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" fill="none" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" fill="none" transform="rotate(120 12 12)"/>
        </svg>
      );
    case 'JavaScript':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s}>
          <rect width="24" height="24" rx="3" fill="#F7DF1E"/>
          <text x="3.5" y="19" fontSize="13" fontWeight="bold" fontFamily="monospace" fill="#000">JS</text>
        </svg>
      );
    case 'TypeScript':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s}>
          <rect width="24" height="24" rx="3" fill="#3178C6"/>
          <text x="2.5" y="19" fontSize="12.5" fontWeight="bold" fontFamily="monospace" fill="#fff">TS</text>
        </svg>
      );
    case 'HTML/CSS':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s} fill="none">
          <path d="M2 3l1.8 16 8.2 2.2 8.2-2.2L22 3H2z" fill="#E34F26"/>
          <path d="M12 19.6V5H20.1l-1.5 13.3L12 19.6z" fill="#EF652A"/>
          <path d="M8.5 8.5h7l-.25 2.5H9l.5 4.5 2.5.7 2.5-.7.25-2.5h2.5l-.5 4.5L12 18.5 7.5 17z" fill="#fff"/>
          <path d="M12 8.5v10l-4.5-1.5-.5-5h2l.25 2.5L12 15v-6.5z" fill="#EBEBEB"/>
        </svg>
      );
    case 'GSAP':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s}>
          <rect width="24" height="24" rx="3" fill="#0AE448"/>
          <text x="2" y="16.5" fontSize="9" fontWeight="900" fontFamily="monospace" fill="#000">GSAP</text>
        </svg>
      );
    case 'Tailwind':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s} fill="#38BDF8">
          <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.17 1.175.665 1.716 1.21C13.248 10.38 14.25 11.4 16.5 11.4c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.17-1.175-.665-1.716-1.21C15.252 7.02 14.25 6 12 6zM7.5 11.4C5.1 11.4 3.6 12.6 3 15c.9-1.2 1.95-1.65 3.15-1.35.685.17 1.175.665 1.716 1.21C8.748 15.78 9.75 16.8 12 16.8c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.17-1.175-.665-1.716-1.21C10.752 12.42 9.75 11.4 7.5 11.4z"/>
        </svg>
      );
    case 'Next.js':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s}>
          <circle cx="12" cy="12" r="11" fill="#000"/>
          <circle cx="12" cy="12" r="11" fill="none" stroke="#333" strokeWidth="0.5"/>
          <path d="M6.5 8h2v6.5L16 8h2v8h-2V9.5L9 17.5H6.5V8z" fill="#fff"/>
        </svg>
      );
    case 'Node.js':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s} fill="#339933">
          <path d="M12 1.85L2.25 7.4v9.2L12 22.15l9.75-5.55V7.4L12 1.85zM11 16.95l-4.75-2.7v-4.5L11 12.45v4.5zm1-6.35L7.5 8.45 12 5.8l4.5 2.65L13 10.6zm1 6.35v-4.5l4.75-2.7v4.5L13 16.95z"/>
        </svg>
      );
    case 'Express':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s}>
          <rect width="24" height="24" rx="3" fill="#1a1a1a"/>
          <text x="2" y="16" fontSize="8" fontWeight="700" fontFamily="monospace" fill="#fff">expr</text>
        </svg>
      );
    case 'MongoDB':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s} fill="#47A248">
          <path d="M12 2C8.5 2 7 5.5 7 8.5c0 3.2 2 5.5 4.5 7.5l.5.4.5-.4C15 14 17 11.7 17 8.5 17 5.5 15.5 2 12 2zm0 16.5l-.5.4C9 20.5 7 18 7 15.5v-.3c1.5 1.5 3.2 2.5 5 3.3zm0 0c1.8-.8 3.5-1.8 5-3.3v.3c0 2.5-2 5-4.5 6.4L12 21l-.5-.3z"/>
        </svg>
      );
    case 'FastAPI':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s}>
          <rect width="24" height="24" rx="3" fill="#009688"/>
          <text x="2" y="15.5" fontSize="7.5" fontWeight="900" fontFamily="monospace" fill="#fff">FAST</text>
          <text x="2" y="22" fontSize="7.5" fontWeight="900" fontFamily="monospace" fill="#fff">API</text>
        </svg>
      );
    case 'Python':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s} fill="none">
          <path d="M11.9 2C7.6 2 7.9 3.8 7.9 3.8V5.9h4.1v.6H5.7S3 6.2 3 10.6c0 4.4 2.4 4.2 2.4 4.2h1.4v-2s-.1-2.4 2.4-2.4h4.1s2.3.04 2.3-2.2V5.3c0 0 .3-3.3-3.7-3.3zm-2.3 1.9c.4 0 .8.3.8.8s-.3.8-.8.8-.8-.3-.8-.8.4-.8.8-.8z" fill="#3776AB"/>
          <path d="M12.1 22C16.4 22 16.1 20.2 16.1 20.2V18.1H12v-.6h6.3s2.7.3 2.7-4.1c0-4.4-2.4-4.2-2.4-4.2h-1.4v2s.1 2.4-2.4 2.4H10.5s-2.3-.04-2.3 2.2v3.9S7.9 22 12.1 22zm2.2-1.9c-.4 0-.8-.3-.8-.8s.3-.8.8-.8.8.3.8.8-.3.8-.8.8z" fill="#FFD43B"/>
        </svg>
      );
    case 'REST/JWT':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s}>
          <rect width="24" height="24" rx="3" fill="#d63031"/>
          <text x="2.5" y="16" fontSize="8" fontWeight="900" fontFamily="monospace" fill="#fff">REST</text>
        </svg>
      );
    case 'Azure':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s} fill="none">
          <path d="M13.5 4.5L7.5 20h4l1.5-4h5l1-4h-4l2-4-3.5-3.5z" fill="#0078D4"/>
          <path d="M3 20l5-10 3 5-3 5H3z" fill="#0078D4" opacity="0.7"/>
        </svg>
      );
    case 'Git':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s} fill="#F05032">
          <path d="M23.6 11.4l-11-11a1.35 1.35 0 00-1.9 0l-2.1 2.1 2.6 2.6a1.6 1.6 0 012 2l2.5 2.5a1.6 1.6 0 011.9 2.1 1.6 1.6 0 11-2.3.3l-2.4-2.4v6.2a1.6 1.6 0 11-1.3 0V9.3a1.6 1.6 0 01-.9-2.1L8.1 4.6l-7.7 7.7a1.35 1.35 0 000 1.9l11 11a1.35 1.35 0 001.9 0l10.3-10.3a1.35 1.35 0 000-1.5z"/>
        </svg>
      );
    case 'Figma':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s} fill="none">
          <path d="M8 24a4 4 0 004-4v-4H8a4 4 0 000 8z" fill="#0ACF83"/>
          <path d="M4 12a4 4 0 014-4h4v8H8a4 4 0 01-4-4z" fill="#A259FF"/>
          <path d="M4 4a4 4 0 014-4h4v8H8A4 4 0 014 4z" fill="#F24E1E"/>
          <path d="M12 0h4a4 4 0 010 8h-4V0z" fill="#FF7262"/>
          <path d="M20 12a4 4 0 11-8 0 4 4 0 018 0z" fill="#1ABCFE"/>
        </svg>
      );
    case 'Postman':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s} fill="#FF6C37">
          <path d="M13.5 2A10.5 10.5 0 1024 12.5 10.51 10.51 0 0013.5 2zm4.08 8.92l-4.15 4.15a1 1 0 01-1.42 0l-1.42-1.42a1 1 0 011.42-1.42l.71.71 3.44-3.44a1 1 0 111.42 1.42z"/>
        </svg>
      );
    case 'Vercel':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s} fill="#fff">
          <path d="M12 2L2 19.5h20L12 2z"/>
        </svg>
      );
    case 'Docker':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s} fill="#2496ED">
          <rect x="1" y="10" width="3" height="3" rx="0.5"/>
          <rect x="5" y="10" width="3" height="3" rx="0.5"/>
          <rect x="9" y="10" width="3" height="3" rx="0.5"/>
          <rect x="9" y="6" width="3" height="3" rx="0.5"/>
          <rect x="13" y="10" width="3" height="3" rx="0.5"/>
          <rect x="13" y="6" width="3" height="3" rx="0.5"/>
          <path d="M20.5 10.5c-.5-.3-1.5-.4-2.5-.2-.2-1.1-.8-2-1.8-2.5l-.4-.2-.2.4c-.3.7-.4 1.5-.3 2.2.1.4.3.8.5 1.1-.5.3-1.3.4-2.3.4H1.5l-.1.5C1.1 13.3 1 14.4 1.5 15.5c.4 1.1 1.2 2 2.3 2.5 1.2.6 2.7 1 4.4 1 3.5 0 6.2-1.6 7.6-4.5.9 0 2.9 0 3.9-2l.2-.4-.9-.6z"/>
        </svg>
      );
    case 'VS Code':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s} fill="none">
          <path d="M17 2L7 12.5 17 22l4-2V4L17 2z" fill="#007ACC"/>
          <path d="M3 8l7 4.5L3 17v-9z" fill="#007ACC" opacity="0.6"/>
          <path d="M17 2L10 8.5l-7 .5 7 4 7 6.5V2z" fill="#1BAAF0"/>
        </svg>
      );
    case 'OpenCV':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s}>
          <rect width="24" height="24" rx="3" fill="#5C3EE8"/>
          <circle cx="8" cy="10" r="4" fill="none" stroke="#fff" strokeWidth="1.5"/>
          <circle cx="16" cy="10" r="4" fill="none" stroke="#2ECC71" strokeWidth="1.5"/>
          <circle cx="12" cy="16" r="4" fill="none" stroke="#E74C3C" strokeWidth="1.5"/>
        </svg>
      );
    case 'MediaPipe':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s}>
          <rect width="24" height="24" rx="3" fill="#00897B"/>
          <text x="2" y="16" fontSize="8" fontWeight="700" fontFamily="monospace" fill="#fff">MP</text>
        </svg>
      );
    case 'LangChain':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s}>
          <rect width="24" height="24" rx="3" fill="#1a1a1a"/>
          <path d="M6 12h4M14 12h4M10 8v8M14 8v8" stroke="#d4ff00" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case 'Gemini':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s} fill="none">
          <path d="M12 2C6.5 6 2 8 2 12s4.5 6 10 10c5.5-4 10-6 10-10S17.5 6 12 2z" fill="url(#gm2)"/>
          <defs>
            <linearGradient id="gm2" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4285F4"/>
              <stop offset="1" stopColor="#9B72CB"/>
            </linearGradient>
          </defs>
        </svg>
      );
    case 'YOLO':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s}>
          <rect width="24" height="24" rx="3" fill="#FF6B35"/>
          <text x="2" y="17" fontSize="9.5" fontWeight="900" fontFamily="monospace" fill="#fff">YOLO</text>
        </svg>
      );
    case 'ChromaDB':
      return (
        <svg viewBox="0 0 24 24" width={s} height={s}>
          <rect width="24" height="24" rx="3" fill="#FF4E7B"/>
          <text x="2" y="16" fontSize="7.5" fontWeight="900" fontFamily="monospace" fill="#fff">Chroma</text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" width={s} height={s}>
          <rect width="24" height="24" rx="4" fill="rgba(255,255,255,0.08)"/>
          <text x="12" y="16" fontSize="7" fontWeight="700" textAnchor="middle" fontFamily="monospace" fill="rgba(255,255,255,0.7)">
            {name.slice(0, 3).toUpperCase()}
          </text>
        </svg>
      );
  }
};

/* ── Skill category groups ─────────────────────────────────────────────── */
const skillBoxes = [
  {
    id: 'frontend',
    label: 'Frontend',
    accent: '#61DAFB',         // cyan
    accentBg: 'rgba(97,218,251,0.08)',
    cornerColor: 'rgba(97,218,251,0.5)',
    items: [
      { name: 'React',      sub: 'Expert' },
      { name: 'JavaScript', sub: 'Advanced' },
      { name: 'HTML/CSS',   sub: 'Expert' },
      { name: 'GSAP',       sub: 'Advanced' },
      { name: 'Tailwind',   sub: 'Advanced' },
      { name: 'Next.js',    sub: 'Intermediate' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & DB',
    accent: '#47A248',         // mongo green
    accentBg: 'rgba(71,162,72,0.08)',
    cornerColor: 'rgba(71,162,72,0.5)',
    items: [
      { name: 'Node.js',  sub: 'Advanced' },
      { name: 'Express',  sub: 'Advanced' },
      { name: 'MongoDB',  sub: 'Advanced' },
      { name: 'FastAPI',  sub: 'Intermediate' },
      { name: 'Python',   sub: 'Advanced' },
      { name: 'REST/JWT', sub: 'Advanced' },
      { name: 'Azure',    sub: 'Intermediate' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & DevOps',
    accent: '#d4ff00',         // accent
    accentBg: 'rgba(212,255,0,0.06)',
    cornerColor: 'rgba(212,255,0,0.5)',
    items: [
      { name: 'Git',      sub: 'Expert' },
      { name: 'Figma',    sub: 'Advanced' },
      { name: 'Postman',  sub: 'Advanced' },
      { name: 'Vercel',   sub: 'Advanced' },
      { name: 'Docker',   sub: 'Intermediate' },
      { name: 'VS Code',  sub: 'Expert' },
    ],
  },
  {
    id: 'ai',
    label: 'AI & ML',
    accent: '#9B72CB',         // purple
    accentBg: 'rgba(155,114,203,0.08)',
    cornerColor: 'rgba(155,114,203,0.5)',
    items: [
      { name: 'Python',    sub: 'Advanced' },
      { name: 'OpenCV',    sub: 'Advanced' },
      { name: 'YOLO',      sub: 'Intermediate' },
      { name: 'MediaPipe', sub: 'Intermediate' },
      { name: 'LangChain', sub: 'Intermediate' },
      { name: 'ChromaDB',  sub: 'Intermediate' },
      { name: 'Gemini',    sub: 'Intermediate' },
    ],
  },
];

/* ── Corner handle decoration ──────────────────────────────────────────── */
function CornerHandles({ color }) {
  return (
    <>
      <span className="sk-corner sk-corner-tl" style={{ '--ch': color }} />
      <span className="sk-corner sk-corner-tr" style={{ '--ch': color }} />
      <span className="sk-corner sk-corner-bl" style={{ '--ch': color }} />
      <span className="sk-corner sk-corner-br" style={{ '--ch': color }} />
      <span className="sk-mid sk-mid-t"  style={{ '--ch': color }} />
      <span className="sk-mid sk-mid-b"  style={{ '--ch': color }} />
      <span className="sk-mid sk-mid-l"  style={{ '--ch': color }} />
      <span className="sk-mid sk-mid-r"  style={{ '--ch': color }} />
    </>
  );
}

/* ── Main component ──────────────────────────────────────────────────────── */
export default function Skills({ skillsData }) {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="skills" className="skills-section">
      <div className="container">

        {/* Header */}
        <div className="section-header-center">
          <span className="section-label skills-label">Technical Competencies</span>
          <h2 className="skills-headline">
            <span className="reveal-line"><span>Skills &amp;</span></span>
            <span className="reveal-line"><span className="serif">Proficiencies</span></span>
          </h2>
        </div>

        {/* 2 × 2 box grid */}
        <div className="sk-grid">
          {skillBoxes.map((group) => (
            <div
              className="sk-box bubble"   /* keep .bubble so GSAP targets it */
              key={group.id}
              style={{
                '--accent': group.accent,
                '--accent-bg': group.accentBg,
                '--corner': group.cornerColor,
              }}
            >
              {/* ── Corner & mid-point handles (reference aesthetic) ── */}
              <CornerHandles color={group.cornerColor} />

              {/* ── Category label badge ────────────────────────────── */}
              <div className="sk-badge">
                <span className="sk-badge-dot" style={{ background: group.accent }} />
                {group.label}
              </div>

              {/* ── Skill chips ─────────────────────────────────────── */}
              <div className="sk-chips">
                {group.items.map((item) => {
                  const key = `${group.id}-${item.name}`;
                  return (
                    <div
                      key={key}
                      className="sk-chip"
                      onMouseEnter={() => setHovered(key)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <span className="sk-chip-icon">
                        <Logo name={item.name} size={22} />
                      </span>
                      <span className="sk-chip-name">{item.name}</span>
                      
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
