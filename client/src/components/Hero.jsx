import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

// ── BlurText: letter/word blur-in animation ────────────────────────────────
function BlurText({ text, delay = 80, animateBy = 'letters', direction = 'top', className = '' }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  const segments = useMemo(
    () => (animateBy === 'words' ? text.split(' ') : text.split('')),
    [text, animateBy]
  );

  return (
    <span ref={ref} className={`hero-blur-wrap ${className}`} aria-label={text}>
      {segments.map((seg, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="hero-blur-char"
          style={{
            filter: inView ? 'blur(0px)' : 'blur(14px)',
            opacity: inView ? 1 : 0,
            transform: inView
              ? 'translateY(0)'
              : `translateY(${direction === 'top' ? '-18px' : '18px'})`,
            transition: `filter 0.6s ease-out ${i * delay}ms,
                         opacity 0.6s ease-out ${i * delay}ms,
                         transform 0.6s ease-out ${i * delay}ms`,
          }}
        >
          {seg}
          {animateBy === 'words' && i < segments.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </span>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
export default function Hero({ profile }) {
  return (
    <section className="hero-main" id="hero">

      {/* ── Cursive signature at top ────────────────────── */}
      <div className="hero-sig" aria-hidden="true">A</div>

      {/* ── Giant centred name + overlaid portrait ────────────────────────── */}
      <div className="hero-center">

        {/* FIRST NAME */}
        <div className="hero-name-row" aria-hidden="true">
          <BlurText text="ADITYA" delay={90} animateBy="letters" direction="top" className="hero-name" />
        </div>

        {/* Portrait — absolutely centered over the name stack */}
        <div className="hero-portrait-abs" id="heroPhoto">
          <img
            src="/hero_photo.png"
            alt="Aditya Modani"
            onError={(e) => {
              /* Unsplash placeholder — young man, portrait crop */
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=400&q=80';
            }}
          />
        </div>

        {/* LAST NAME */}
        <div className="hero-name-row" aria-hidden="true">
          <BlurText text="MODANI" delay={90} animateBy="letters" direction="top" className="hero-name" />
        </div>

        {/* Accessible full name (screen-readers) */}
        <span className="sr-only">Aditya Modani</span>
      </div>

      {/* ── Tagline ───────────────────────────────────────────────────────── */}
      <div className="hero-tagline-row">
        <BlurText
          text="Designing human experiences in code."
          delay={110}
          animateBy="words"
          direction="top"
          className="hero-tagline"
        />
      </div>

      {/* ── Scroll chevron ────────────────────────────────────────────────── */}
      <a href="#about" className="hero-chevron" aria-label="Scroll to about">
        <ChevronDown size={28} />
      </a>

    </section>
  );
}
