import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faReact, faNodeJs, faPython, faJs, faHtml5, faCss3Alt,
  faDocker, faFigma, faGitAlt, faGithub,
  faLinkedin, faAws,
} from '@fortawesome/free-brands-svg-icons';

/* ─────────────────────────────────────────────────────────────────────────
   Logo component
   Priority: Font Awesome brand icon → jsDelivr programming-languages-logos
             → Logo.dev CDN → inline SVG fallback
───────────────────────────────────────────────────────────────────────── */

/* jsDelivr CDN base for programming-languages-logos package */
const PL_CDN = 'https://cdn.jsdelivr.net/gh/abranhe/programming-languages-logos/src';

/* Logo.dev CDN — publishable-key free tier, no account needed for basic use */
const LOGO_DEV = (domain) =>
  `https://img.logo.dev/${domain}?token=pk_X2ZBFt0FTtCFRmmpu1GFaA&size=40`;

/* Font Awesome icon map */
const FA_ICONS = {
  'React':      faReact,
  'JavaScript': faJs,
  'HTML/CSS':   faHtml5,
  'Tailwind':   null,   // no FA brand — use Logo.dev
  'Next.js':    null,
  'Node.js':    faNodeJs,
  'Express':    null,
  'MongoDB':    null,
  'FastAPI':    null,
  'Python':     faPython,
  'REST/JWT':   null,
  'Azure':      null,
  'Git':        faGitAlt,
  'Figma':      faFigma,
  'Postman':    null,
  'Vercel':     null,
  'Docker':     faDocker,
  'VS Code':    null,
  'OpenCV':     null,
  'LangChain':  null,
  'YOLO':       null,
  'DaVinci Resolve': null,
  'After Effects':   null,
  'Premiere Pro':    null,
};

/* Font-Awesome icon colours */
const FA_COLORS = {
  'React':      '#61DAFB',
  'JavaScript': '#F7DF1E',
  'HTML/CSS':   '#E34F26',
  'Node.js':    '#339933',
  'Python':     '#3776AB',
  'Git':        '#F05032',
  'Figma':      '#A259FF',
  'Docker':     '#2496ED',
};

/* Logo.dev domain map — covers everything without a FA icon */
const LOGO_DEV_DOMAINS = {
  'Tailwind':   'tailwindcss.com',
  'Next.js':    'nextjs.org',
  'Express':    'expressjs.com',
  'MongoDB':    'mongodb.com',
  'FastAPI':    'fastapi.tiangolo.com',
  'REST/JWT':   null,   // inline SVG below
  'Azure':      'azure.microsoft.com',
  'Postman':    'postman.com',
  'Vercel':     'vercel.com',
  'VS Code':    'code.visualstudio.com',
  'OpenCV':     'opencv.org',
  'LangChain':  'langchain.com',
  'YOLO':       'ultralytics.com',
  'DaVinci Resolve': 'blackmagicdesign.com',
  'After Effects':   'adobe.com',
  'Premiere Pro':    'adobe.com',
};

/* Inline SVG fallbacks for anything not coverable above */
const InlineFallback = ({ name, size }) => {
  const initials = name.replace(/[^A-Z0-9]/gi, '').slice(0, 3).toUpperCase();
  const colors = {
    'REST/JWT': ['#d63031', '#fff'],
  };
  const [bg, fg] = colors[name] || ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.7)'];
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <rect width="24" height="24" rx="4" fill={bg} />
      <text
        x="12" y="15.5"
        fontSize={initials.length > 2 ? '6.5' : '8'}
        fontWeight="700"
        textAnchor="middle"
        fontFamily="monospace"
        fill={fg}
      >{initials}</text>
    </svg>
  );
};

const Logo = ({ name, size = 26 }) => {
  /* 1. Font Awesome */
  const faIcon = FA_ICONS[name];
  if (faIcon) {
    return (
      <FontAwesomeIcon
        icon={faIcon}
        style={{
          width: size,
          height: size,
          color: FA_COLORS[name] || 'rgba(244,244,240,0.75)',
        }}
      />
    );
  }

  /* 2. Logo.dev */
  const domain = LOGO_DEV_DOMAINS[name];
  if (domain) {
    return (
      <img
        src={LOGO_DEV(domain)}
        alt={`${name} logo`}
        width={size}
        height={size}
        style={{ objectFit: 'contain', display: 'block', borderRadius: 3 }}
        onError={(e) => {
          /* swap to initials box silently */
          const wrap = e.currentTarget.parentElement;
          if (wrap) {
            e.currentTarget.style.display = 'none';
            wrap.style.display = 'flex';
          }
        }}
        loading="lazy"
      />
    );
  }

  /* 3. Inline SVG fallback */
  return <InlineFallback name={name} size={size} />;
};

/* ── Skill category groups — 3 boxes ──────────────────────────────────── */
const skillBoxes = [
  {
    id: 'frontend',
    label: 'Frontend',
    accent: '#61DAFB',
    accentBg: 'rgba(97,218,251,0.08)',
    cornerColor: 'rgba(97,218,251,0.5)',
    items: [
      { name: 'React',      sub: 'Expert' },
      { name: 'JavaScript', sub: 'Advanced' },
      { name: 'HTML/CSS',   sub: 'Expert' },
      { name: 'Tailwind',   sub: 'Advanced' },
      { name: 'GSAP',       sub: 'Advanced' },
      { name: 'Next.js',    sub: 'Intermediate' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    accent: '#47A248',
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
    label: 'Tools & Creative',
    accent: '#d4ff00',
    accentBg: 'rgba(212,255,0,0.06)',
    cornerColor: 'rgba(212,255,0,0.5)',
    items: [
      { name: 'Git',      sub: 'Expert' },
      { name: 'Figma',    sub: 'Advanced' },
      { name: 'Postman',  sub: 'Advanced' },
      { name: 'Vercel',   sub: 'Advanced' },
      { name: 'Docker',   sub: 'Intermediate' },
      { name: 'VS Code',  sub: 'Expert' },
      { name: 'Python',   sub: 'Advanced' },
      { name: 'OpenCV',   sub: 'Advanced' },
      { name: 'YOLO',     sub: 'Intermediate' },
      { name: 'LangChain', sub: 'Intermediate' },
      { name: 'DaVinci Resolve', sub: 'Intermediate' },
      { name: 'After Effects',   sub: 'Intermediate' },
      { name: 'Premiere Pro',    sub: 'Intermediate' },
    ],
  },
];

/* ── GSAP handles ──────────────────────────────────────────────────────── */
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

export default function Skills({ skillsData }) {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header-center">
          <span className="section-label skills-label">Technical Competencies</span>
          <h2 className="skills-headline">
            <span className="reveal-line"><span>Skills &amp;</span></span>
            <span className="reveal-line"><span className="serif">Proficiencies</span></span>
          </h2>
        </div>

        <div className="sk-grid sk-grid--three">
          {skillBoxes.map((group) => (
            <div
              className="sk-box bubble"
              key={group.id}
              style={{
                '--accent': group.accent,
                '--accent-bg': group.accentBg,
                '--corner': group.cornerColor,
              }}
            >
              <CornerHandles color={group.cornerColor} />
              <div className="sk-badge">
                <span className="sk-badge-dot" style={{ background: group.accent }} />
                {group.label}
              </div>
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
