/**
 * Hero.jsx — Editorial Cover × Digital-Activism Poster
 * =====================================================
 * NO image assets required. Every visual is CSS/SVG/canvas.
 * Drop real files into /public/hero/ to upgrade individual slots;
 * the component tests each src silently and swaps it in if it loads.
 *
 * ASSET SLOTS (filename → fallback):
 *   hero/portrait.webp       → inline SVG bust silhouette
 *   hero/tape-strip.png      → CSS lime plate
 *   hero/paper-tear.png      → CSS bone torn polygon
 *   hero/halftone-orb.png    → SVG halftone circle
 *   hero/px-cluster-a.png    → CSS pixel block group
 *   hero/px-cluster-b.png    → CSS pixel block group
 *   hero/grid-fragment.png   → CSS ruled fragment
 *   hero/noise-patch.png     → CSS noise overlay
 *   hero/spark.png           → SVG 4-point star
 *
 * TUNABLE CONSTANTS (adjust at top of file):
 *   WILDNESS        0–1     glitch intensity, name opacity, overlap
 *   GRID_COLS       number  mosaic columns on desktop
 *   GRID_ROWS       number  mosaic rows on desktop
 *   BLOCK_DENSITY   0–1     fraction of cells filled
 *   USE_PLACEHOLDERS 'auto'|'always'|'never'  asset swap behaviour
 */

import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import portraitSrc from './hero/portrait.png';
import bgSrc from './hero/background_landing.png';
import './Hero.css';

/* ─────────────────────────────────────────────────────────────────────────
   TUNING CONSTANTS
───────────────────────────────────────────────────────────────────────── */
const WILDNESS        = 0.4;   // 0 = calm | 1 = glitched, cropped, overlapping
const GRID_COLS       = 24;
const GRID_ROWS       = 16;
const GRID_COLS_MOB   = 12;
const GRID_ROWS_MOB   = 10;
const BLOCK_DENSITY   = 0.30;
const USE_PLACEHOLDERS = 'auto'; // 'auto' | 'always' | 'never'

/* Face-safe zone — fraction of the portrait bounding box.
   Blocks inside are capped at 8% opacity; density is 5% of normal. */
const FACE_ZONE = { x: 0.22, y: 0.05, w: 0.56, h: 0.42 };

/* ─────────────────────────────────────────────────────────────────────────
   COLOUR PALETTE
───────────────────────────────────────────────────────────────────────── */
const LIME   = '#d4ff00';
const FG     = '#f4f4f0';
const WARM   = '#2a2724';
const COOL   = '#1d2124';
const BONE   = '#cfcabd';
const RUST   = '#c2410c';

/* Mosaic cell fills — RGB strings for canvas fillStyle */
const CELL_PALETTE = [
  `rgba(212,255,0,0.85)`,   // lime  — ~6 % of filled
  `rgba(212,255,0,0.55)`,   // lime mid
  `rgba(42,39,36,0.90)`,    // warm gray
  `rgba(29,33,36,0.90)`,    // cool gray
  `rgba(207,202,189,0.65)`, // bone
  `rgba(194,65,12,0.60)`,   // rust — ~2 %
  `rgba(55,52,48,0.82)`,    // dark warm
  `rgba(34,38,42,0.82)`,    // dark cool
];

/* ─────────────────────────────────────────────────────────────────────────
   SVG SILHOUETTE  (bust + shoulders, no face detail — editorial grade)
───────────────────────────────────────────────────────────────────────── */
function PortraitSilhouette() {
  return (
    <svg
      viewBox="0 0 360 520"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <radialGradient id="portGrad" cx="50%" cy="38%" r="55%">
          <stop offset="0%"   stopColor="#3a3530" />
          <stop offset="100%" stopColor="#1a1714" />
        </radialGradient>
        <clipPath id="portClip">
          <rect x="0" y="0" width="360" height="520" rx="4" />
        </clipPath>
      </defs>

      {/* Background fill */}
      <rect x="0" y="0" width="360" height="520" fill="url(#portGrad)" clipPath="url(#portClip)" />

      {/* Shoulders / torso — broad editorial silhouette */}
      <path
        d="M0 520 L0 350 C 60 290, 120 270, 180 265 C 240 270, 300 290, 360 350 L360 520 Z"
        fill="#1c1a17"
      />

      {/* Neck */}
      <rect x="156" y="218" width="48" height="60" rx="6" fill="#252220" />

      {/* Head — clean oval */}
      <ellipse cx="180" cy="190" rx="82" ry="96" fill="#2e2b27" />

      {/* Very subtle face highlight — keeps it editorial, not cartoony */}
      <ellipse cx="178" cy="178" rx="44" ry="52" fill="rgba(207,202,189,0.06)" />

      {/* Hair mass */}
      <path
        d="M98 165 C 98 80, 262 80, 262 165 C 262 90, 98 90, 98 165 Z"
        fill="#171512"
      />

      {/* Grain overlay via featureless pattern */}
      <rect x="0" y="0" width="360" height="520" fill="rgba(212,255,0,0.02)" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   COLLAGE PIECES  (CSS + inline SVG, no external files)
───────────────────────────────────────────────────────────────────────── */

/* Lime tape strip with slogan text */
function TapeStrip({ style, text, rot, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`h5-collage ${className}`}
      style={{
        position: 'absolute',
        ...style,
        transform: `rotate(${rot}deg)`,
        background: LIME,
        color: '#070707',
        fontFamily: '"Syne", system-ui, sans-serif',
        fontWeight: 800,
        fontSize: 'clamp(0.58rem, 0.9vw, 0.78rem)',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        padding: '0.35em 1.1em',
        whiteSpace: 'nowrap',
        boxShadow: '3px 3px 0 rgba(0,0,0,0.55)',
        userSelect: 'none',
        zIndex: 7,
      }}
    >
      {text}
    </div>
  );
}

/* Torn off-white paper — polygon clip-path */
function PaperTear({ style, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`h5-collage ${className}`}
      style={{
        position: 'absolute',
        ...style,
        background: BONE,
        clipPath: 'polygon(0% 12%, 8% 0%, 100% 4%, 96% 88%, 100% 100%, 4% 96%, 0% 100%)',
        zIndex: 7,
        boxShadow: '4px 4px 0 rgba(0,0,0,0.5)',
        opacity: 0.88,
      }}
    />
  );
}

/* Halftone orb — SVG dots in a circle */
function HalftoneOrb({ style, className = '' }) {
  const dots = [];
  const cx = 60, cy = 60, r = 54;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const x = 8 + col * 13;
      const y = 8 + row * 13;
      const dist = Math.hypot(x - cx, y - cy);
      if (dist < r) {
        const t = 1 - dist / r;
        dots.push(
          <circle key={`${row}-${col}`} cx={x} cy={y} r={t * 4.5 + 0.8} fill={LIME} opacity={0.7 + t * 0.3} />
        );
      }
    }
  }
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`h5-collage ${className}`}
      style={{ position: 'absolute', ...style, zIndex: 7, opacity: 0.7 }}
    >
      {dots}
    </svg>
  );
}

/* Pixel cluster — two offset square groups */
function PixelCluster({ style, accent = false, className = '' }) {
  const c = accent ? LIME : BONE;
  const c2 = accent ? '#a3c400' : WARM;
  return (
    <svg
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`h5-collage ${className}`}
      style={{ position: 'absolute', ...style, zIndex: 7 }}
    >
      <rect x="0"  y="0"  width="18" height="18" fill={c}  opacity="0.9" />
      <rect x="20" y="0"  width="18" height="18" fill={c2} opacity="0.7" />
      <rect x="0"  y="20" width="18" height="18" fill={c2} opacity="0.5" />
      <rect x="20" y="20" width="18" height="18" fill={c}  opacity="0.3" />
      <rect x="42" y="10" width="12" height="12" fill={c}  opacity="0.6" />
      <rect x="42" y="24" width="12" height="12" fill={c2} opacity="0.4" />
      <rect x="56" y="10" width="12" height="12" fill={c2} opacity="0.3" />
    </svg>
  );
}

/* Grid fragment — ruled lines CSS box */
function GridFragment({ style, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`h5-collage ${className}`}
      style={{
        position: 'absolute',
        ...style,
        zIndex: 7,
        border: `1px solid rgba(255,255,255,0.18)`,
        backgroundImage: `
          repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 14px),
          repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 14px)
        `,
      }}
    />
  );
}

/* 4-point spark — inline SVG */
function Spark({ style, className = '' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`h5-collage ${className}`}
      style={{ position: 'absolute', ...style, zIndex: 7 }}
    >
      <path d="M24 0 L26.5 21.5 L48 24 L26.5 26.5 L24 48 L21.5 26.5 L0 24 L21.5 21.5 Z" fill={LIME} />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   SOCIAL PLATES  (Font Awesome brand icons on CSS craft plates)
───────────────────────────────────────────────────────────────────────── */
const SOCIAL = [
  {
    label: 'Aditya on GitHub',
    href: 'https://github.com/Aditya4453',
    rot: -4,
    icon: <FontAwesomeIcon icon={faGithub} style={{ width: 20, height: 20 }} />,
  },
  {
    label: 'Aditya on LinkedIn',
    href: 'https://linkedin.com/in/aditya-modani',
    rot: 3,
    icon: <FontAwesomeIcon icon={faLinkedin} style={{ width: 20, height: 20, color: '#0A66C2' }} />,
  },
  {
    label: 'Aditya on X',
    href: 'https://x.com',
    rot: -2,
    icon: <FontAwesomeIcon icon={faXTwitter} style={{ width: 18, height: 18 }} />,
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   PIXEL MOSAIC  (single <canvas>)
───────────────────────────────────────────────────────────────────────── */
function usePixelMosaic(canvasRef, portraitRef) {
  const stateRef  = useRef([]);
  const rafRef    = useRef(null);
  const timeRef   = useRef(0);
  const hiddenRef = useRef(false);
  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const build = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    if (!W || !H) return;
    canvas.width  = W;
    canvas.height = H;

    const mob   = W < 640;
    const cols  = mob ? GRID_COLS_MOB : GRID_COLS;
    const rows  = mob ? GRID_ROWS_MOB : GRID_ROWS;
    const dens  = mob ? BLOCK_DENSITY * 0.5 : BLOCK_DENSITY;
    const cw    = W / cols;
    const ch    = H / rows;

    /* Portrait bounding box — used for face-zone calculation */
    let pbx = W * 0.52, pby = H * 0.08, pbw = W * 0.38, pbh = H * 0.82;
    if (portraitRef.current) {
      const r = portraitRef.current.getBoundingClientRect();
      const cr = canvas.getBoundingClientRect();
      pbx = r.left - cr.left;
      pby = r.top  - cr.top;
      pbw = r.width;
      pbh = r.height;
    }

    const blocks = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        /* Check face-zone */
        const px = c * cw + cw / 2;
        const py = r * ch + ch / 2;
        const fzx1 = pbx + FACE_ZONE.x * pbw;
        const fzx2 = pbx + (FACE_ZONE.x + FACE_ZONE.w) * pbw;
        const fzy1 = pby + FACE_ZONE.y * pbh;
        const fzy2 = pby + (FACE_ZONE.y + FACE_ZONE.h) * pbh;
        const inFace = px > fzx1 && px < fzx2 && py > fzy1 && py < fzy2;

        const effectiveDens = inFace ? dens * 0.05 : dens;
        if (Math.random() > effectiveDens) continue;

        /* Colour pick */
        const roll = Math.random();
        let cidx;
        if (roll < 0.06)       cidx = Math.random() < 0.5 ? 0 : 1; // lime ~6%
        else if (roll < 0.08)  cidx = 5;                              // rust ~2%
        else                   cidx = 2 + Math.floor(Math.random() * 6);

        /* Face-zone: very low opacity for edge fragments */
        const baseOpacity = inFace ? Math.random() * 0.08 : 1;

        /* Drift */
        const drifts   = Math.random() < (mob ? 0.2 : 0.38);
        const driftAmp = mob ? 1.2 : 1 + Math.random() * 2.5;
        const driftFreq= 0.5 + Math.random() * 0.7;
        const driftPh  = Math.random() * Math.PI * 2;

        /* Micro offset ±1-3px */
        const ox = (Math.random() - 0.5) * 3;
        const oy = (Math.random() - 0.5) * 3;

        /* Glitch candidate — max one row every few seconds */
        const isGlitch = !inFace && Math.random() < 0.005 * WILDNESS;

        blocks.push({
          c, r,
          x: c * cw + ox,
          y: r * ch + oy,
          w: cw - 1,
          h: ch - 1,
          color: CELL_PALETTE[cidx],
          baseOpacity,
          drifts,
          driftAmp,
          driftFreq,
          driftPh,
          isGlitch,
          glitchTimer: 120 + Math.random() * 200,
          glitchActive: 0,
          cw,   // store for glitch offset
        });
      }
    }
    stateRef.current = blocks;
  }, [canvasRef, portraitRef]);

  useEffect(() => {
    build();

    const ro = new ResizeObserver(build);
    if (canvasRef.current) ro.observe(canvasRef.current);

    const onVis = () => { hiddenRef.current = document.hidden; };
    document.addEventListener('visibilitychange', onVis);

    const canvas = canvasRef.current;
    const ctx    = canvas ? canvas.getContext('2d') : null;
    if (!ctx) return;

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      if (!W || !H) { rafRef.current = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, W, H);

      /* Fine grid lines 3-4% white */
      const cols = W < 640 ? GRID_COLS_MOB : GRID_COLS;
      const rows = W < 640 ? GRID_ROWS_MOB : GRID_ROWS;
      const cw   = W / cols, ch = H / rows;
      ctx.strokeStyle = 'rgba(255,255,255,0.035)';
      ctx.lineWidth   = 1;
      for (let c = 0; c <= cols; c++) {
        ctx.beginPath(); ctx.moveTo(c * cw, 0); ctx.lineTo(c * cw, H); ctx.stroke();
      }
      for (let r = 0; r <= rows; r++) {
        ctx.beginPath(); ctx.moveTo(0, r * ch); ctx.lineTo(W, r * ch); ctx.stroke();
      }

      const t  = timeRef.current;
      // Coloured mosaic blocks removed — grid lines only.
      // (block state is still built so face-zone logic stays intact for future use)

      ctx.globalAlpha = 1;
      if (!hiddenRef.current && !reducedMotion) timeRef.current += 0.016;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [build, reducedMotion]);
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN HERO COMPONENT
   Exposes startEntrance() via ref so App.jsx can trigger after loader
───────────────────────────────────────────────────────────────────────── */
const Hero = forwardRef(function Hero({ profile }, ref) {
  const sectionRef    = useRef(null);
  const wordmarkRef   = useRef(null);
  const portraitWrap  = useRef(null);
  const veilRef       = useRef(null);
  const canvasRef     = useRef(null);
  const labelRef      = useRef(null);
  const h1Ref         = useRef(null);
  const stmtRef       = useRef(null);
  const ctaRef        = useRef(null);
  const metaRef       = useRef(null);
  const socialRef     = useRef(null);
  const folioRef      = useRef(null);
  const tickerRef     = useRef(null);

  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  /* Build the canvas mosaic */
  usePixelMosaic(canvasRef, portraitWrap);

  /* ── Magnetic CTA ──────────────────────────────────────────────────── */
  useEffect(() => {
    const wrap = ctaRef.current;
    if (!wrap) return;
    const btn = wrap.querySelector('a') || wrap;
    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power3.out' });
    };
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' });
    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    return () => { wrap.removeEventListener('mousemove', onMove); wrap.removeEventListener('mouseleave', onLeave); };
  }, []);

  /* ── Mouse parallax on wordmark + portrait ─────────────────────────── */
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;
    const onMove = (e) => {
      const { innerWidth: W, innerHeight: H } = window;
      const nx = (e.clientX / W - 0.5) * 2;
      const ny = (e.clientY / H - 0.5) * 2;
      if (wordmarkRef.current)
        gsap.to(wordmarkRef.current, { x: nx * 16, y: ny * 9, duration: 1.2, ease: 'power1.out', overwrite: 'auto' });
      if (portraitWrap.current)
        gsap.to(portraitWrap.current, { x: nx * -9, y: ny * -5, duration: 1.0, ease: 'power1.out', overwrite: 'auto' });
    };
    section.addEventListener('mousemove', onMove, { passive: true });
    return () => section.removeEventListener('mousemove', onMove);
  }, [reducedMotion]);

  /* ── Entrance timeline (called by App.jsx after loader exits) ──────── */
  const startEntrance = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      /* Show final state immediately */
      gsap.set([
        wordmarkRef.current, portraitWrap.current, veilRef.current,
        labelRef.current, h1Ref.current, stmtRef.current,
        ctaRef.current, metaRef.current, socialRef.current,
        folioRef.current, tickerRef.current,
        '.h5-collage', '.h5-micro', '.h5-crop', '.h5-reg', '.h5-rule',
        '.h5-h1-line > span',
      ], { clearProps: 'all' });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    /* 1. BG + wordmark */
    tl.from(wordmarkRef.current,
      { opacity: 0, scale: 1.06, duration: 1.4, ease: 'power2.out' }, 0);

    /* 2. Portrait + veil */
    tl.from(portraitWrap.current,
      { opacity: 0, y: 22, duration: 1.2, ease: 'power4.out' }, 0.25);
    tl.from(veilRef.current, { opacity: 0, duration: 1.1 }, 0.1);

    /* 3. Grid lines / canvas */
    tl.from(canvasRef.current, { opacity: 0, duration: 0.9 }, 0.5);

    /* 4. Pixel blocks already drawn by canvas — fade canvas in from step 3 */

    /* 5. Collage pieces land with rotation settle */
    tl.from('.h5-collage', {
      opacity: 0, y: -14, scale: 0.92,
      rotation: () => (Math.random() - 0.5) * 12,
      stagger: { each: 0.07, from: 'random' },
      duration: 0.8, ease: 'back.out(1.6)',
    }, 0.6);

    /* 6. Editorial furniture */
    tl.from(['.h5-crop', '.h5-reg', '.h5-rule', '.h5-folio'],
      { opacity: 0, duration: 0.7, stagger: 0.05 }, 0.75);

    /* 7. Micro-labels */
    tl.from('.h5-micro',
      { opacity: 0, y: 5, stagger: 0.08, duration: 0.5 }, 0.95);

    /* 8. Label kicker */
    tl.from(labelRef.current,
      { opacity: 0, y: 14, duration: 0.6 }, 1.1);

    /* 9. Headline mask reveal */
    tl.from('.h5-h1-line > span',
      { y: '108%', duration: 0.95, ease: 'power4.out', stagger: 0.1 }, 1.2);

    /* 10. Statement */
    tl.from(stmtRef.current,
      { opacity: 0, y: 14, duration: 0.65 }, 1.45);

    /* 11. CTA */
    tl.from(ctaRef.current,
      { opacity: 0, y: 10, scale: 0.94, duration: 0.5, ease: 'back.out(2)' }, 1.6);

    /* 12. Meta + social */
    tl.from([metaRef.current, socialRef.current],
      { opacity: 0, y: 8, duration: 0.45, stagger: 0.1 }, 1.72);

    /* 13. Ticker */
    tl.from(tickerRef.current, { opacity: 0, duration: 0.5 }, 1.85);

    /* Ongoing: gentle collage float */
    gsap.utils.toArray('.h5-collage').forEach((el, i) => {
      gsap.to(el, {
        y: `+=${4 + i * 1.2}`,
        yoyo: true, repeat: -1,
        duration: 6 + i * 0.8,
        ease: 'sine.inOut',
        delay: i * 0.4,
      });
    });
  }, [reducedMotion]);

  /* Expose startEntrance to parent via ref */
  useImperativeHandle(ref, () => ({ startEntrance }), [startEntrance]);

  /* Ticker text */
  const TICKER_TEXT = 'ADITYA · PRODUCT · SYSTEMS · SIGNAL · DESIGN · CRAFT · '.repeat(8);

  /* ── RENDER ─────────────────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="hero"
      className="h5-section"
      aria-label="Hero — Aditya"
    >
      {/* ── Layer 1: BG field + vignette ──────────────────────────────── */}
      <div className="h5-bg" aria-hidden="true" />

      {/* ── Layer 1b: Background image ────────────────────────────────── */}
      <img
        src={bgSrc}
        alt=""
        aria-hidden="true"
        className="h5-bg-img"
      />

      {/* ── Layer 2: Giant ADITYA wordmark ────────────────────────────── */}
      <div
        ref={wordmarkRef}
        className="h5-wordmark"
        aria-hidden="true"
        style={{ '--wm-opacity': 0.07 + WILDNESS * 0.11 }}
      >
        ADITYA
      </div>

      {/* ── Layer 3: Portrait ─────────────────────────────────────────── */}
      

      {/* ── Layer 4: Gradient veil ─────────────────────────────────────── */}
      <div ref={veilRef} className="h5-veil" aria-hidden="true" />

      {/* ── Layers 5+6: canvas (grid lines + mosaic) ──────────────────── */}
      <canvas
        ref={canvasRef}
        className="h5-canvas"
        aria-hidden="true"
      />

      {/* ── Layer 7: Collage elements ─────────────────────────────────── */}

      {/* Second slogan strip — off-white, no background */}
      <div
        aria-hidden="true"
        className="h5-collage h5-mob-hide"
        style={{
          position: 'absolute', left: '62%', top: '76%', zIndex: 7,
          fontFamily: '"Syne", system-ui, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(0.52rem, 0.75vw, 0.7rem)',
          letterSpacing: '0.13em',
          textTransform: 'uppercase',
          color: '#f4f4f0',
          opacity: 0.55,
          transform: 'rotate(-2deg)',
          whiteSpace: 'nowrap',
        }}
      >
        ENCODED, NOT ERASED.
      </div>

      <HalftoneOrb className="h5-mob-hide" style={{ right: '8%', top: '8%', width: 120, height: 120, transform: 'rotate(-8deg)' }} />
      <PixelCluster style={{ left: '1%', top: '22%', width: 88, height: 88, transform: 'rotate(6deg)', opacity: 0.8 }} accent={false} />
      <PixelCluster className="h5-mob-hide" style={{ right: '2%', top: '42%', width: 72, height: 72, transform: 'rotate(-5deg)', opacity: 0.75 }} accent={true} />
      <GridFragment className="h5-mob-hide" style={{ left: '4%', top: '42%', width: 120, height: 80, transform: 'rotate(1deg)', opacity: 0.55 }} />
      <Spark className="h5-mob-hide" style={{ left: '44%', top: '6%', width: 38, height: 38, transform: 'rotate(15deg)', opacity: 0.9 }} />

      {/* ── Layer 8: Editorial furniture ──────────────────────────────── */}
      <span className="h5-crop h5-crop--tl" aria-hidden="true" />
      <span className="h5-crop h5-crop--tr" aria-hidden="true" />
      <span className="h5-crop h5-crop--bl" aria-hidden="true" />
      <span className="h5-crop h5-crop--br" aria-hidden="true" />

      <span className="h5-reg" aria-hidden="true">⊕</span>

      <div className="h5-rule h5-rule--h" aria-hidden="true">
        <span className="h5-coord">0°26′N 75°49′E · 2025</span>
      </div>
      <div className="h5-rule h5-rule--v" aria-hidden="true" />

      <div ref={folioRef} className="h5-folio" aria-hidden="true">
        ADITYA — PORTFOLIO — ISSUE&nbsp;03
      </div>

      {/* Micro-labels */}
      <div className="h5-micro" style={{ left: '37%', top: '11%', textAlign: 'right' }} aria-hidden="true">— V3.0 / 2025</div>
      <div className="h5-micro" style={{ left: '63%', top: '60%' }}                    aria-hidden="true">— TASK 01: IDENTITY</div>
      <div className="h5-micro h5-mob-hide" style={{ left: '7%', top: '55%' }}         aria-hidden="true">— STATUS: OPEN FOR WORK</div>
      <div className="h5-micro h5-mob-hide" style={{ left: '63%', top: '16%' }}        aria-hidden="true">— FIG. A: SELF-PORTRAIT, ENCODED</div>

      {/* ── Layer 9: UI text + CTA + social ───────────────────────────── */}
      <div className="h5-ui">

        {/* Index */}
        <div className="h5-index" aria-hidden="true">
          <span className="h5-index-num">01</span>
          <span className="h5-index-div" />
          <span className="h5-index-lbl">Aditya</span>
        </div>

        {/* Label kicker */}
        <p ref={labelRef} className="h5-kicker" aria-label="Role">
          Product Designer &amp; Creative Technologist
        </p>

        {/* H1 — mask reveal */}
        <h1 ref={h1Ref} className="h5-h1">
          <span className="h5-h1-line" aria-hidden="true">
            <span>ADITYA</span>
          </span>
          <span className="h5-h1-line h5-h1-serif" aria-hidden="true">
            <span>builds.</span>
          </span>
          <span className="h5-sr-only">Aditya builds.</span>
        </h1>

        {/* Statement */}
        <p ref={stmtRef} className="h5-statement">
          Digital products and systems with weight:<br className="h5-br" />
          precise, considered, and impossible to ignore.
        </p>

        {/* CTA */}
        <div className="h5-cta-row">
          <div ref={ctaRef} className="h5-cta-wrap magnetic">
            <a href="#work" className="h5-cta" aria-label="View selected work">
              Selected Work
              <span aria-hidden="true" className="h5-cta-arrow">→</span>
            </a>
          </div>
          <p ref={metaRef} className="h5-meta" aria-hidden="true">
            4 selected projects · 2024–2025
          </p>
        </div>

        {/* Social plates */}
        <div ref={socialRef} className="h5-social" aria-label="Social links">
          {SOCIAL.map(({ label, href, rot, icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="h5-social-plate"
              style={{ '--plate-rot': `${rot}deg` }}
            >
              {icon}
            </a>
          ))}
        </div>

      </div>{/* /h5-ui */}

      {/* ── Ticker ─────────────────────────────────────────────────────── */}
      <div ref={tickerRef} className="h5-ticker" aria-hidden="true">
        <div className="h5-ticker-inner">{TICKER_TEXT}</div>
      </div>

    </section>
  );
});

export default Hero;
