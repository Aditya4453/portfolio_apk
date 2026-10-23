import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Principles from './components/Principles';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ExperienceTimeline from './components/ExperienceTimeline';
import Achievements from './components/Achievements';
import ResumeSection from './components/ResumeSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { fallbackPortfolioData } from './data/fallbackData';

gsap.registerPlugin(ScrollTrigger);
export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadPercent, setLoadPercent] = useState(0);
  const [portfolio, setPortfolio] = useState(fallbackPortfolioData);
  const hasInitializedAnimations = useRef(false);
  const heroRef = useRef(null); // ref to Hero's startEntrance imperative handle

  // Fetch portfolio data from MERN Express API
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch('/api/portfolio');
        if (response.ok) {
          const resJson = await response.json();
          if (resJson.success && resJson.data) {
            setPortfolio(resJson.data);
          }
        }
      } catch (err) {
        console.warn('API fetch defaulted to fallback data:', err.message);
      }
    };

    fetchPortfolioData();
  }, []);

  // Page Load & Short Loader Animation System
  useEffect(() => {
    const loaderBar = document.getElementById('loaderBar');
    const loaderPercentEl = document.getElementById('loaderPercent');

    // Intro loader text
    gsap.to('.loader-logo', { opacity: 1, duration: 0.5, ease: 'power2.out' });
    gsap.to('.loader-bar-wrap', { opacity: 1, duration: 0.4, delay: 0.1 });
    gsap.to('.loader-percent', { opacity: 1, duration: 0.4, delay: 0.1 });

    const progressObj = { value: 0 };
    gsap.to(progressObj, {
      value: 100,
      duration: 1.4,
      ease: 'power2.inOut',
      delay: 0.2,
      onUpdate: () => {
        const p = Math.round(progressObj.value);
        setLoadPercent(p);
        if (loaderPercentEl) loaderPercentEl.textContent = `${p}%`;
        if (loaderBar) gsap.set(loaderBar, { scaleX: p / 100 });
      },
      onComplete: () => {
        // Exit loader with curtain lift
        const exitTl = gsap.timeline({
          onComplete: () => {
            setLoading(false);
            if (!hasInitializedAnimations.current) {
              hasInitializedAnimations.current = true;
              playHeroEntrance();
            }
          },
        });

        exitTl
          .to('.loader-logo, .loader-bar-wrap, .loader-percent', {
            opacity: 0,
            y: -15,
            duration: 0.4,
            ease: 'power2.in',
            stagger: 0.05,
          })
          .to('.loader-screen', {
            yPercent: -100,
            duration: 0.85,
            ease: 'power4.inOut',
          }, '-=0.15');
      },
    });
  }, []);

  // Staggered Hero Entrance and GSAP Motion System
  const playHeroEntrance = () => {
    // Nav fades in
    gsap.to('nav.site-nav', { opacity: 1, duration: 0.8, ease: 'power3.out' });
    // Hero entrance is orchestrated inside Hero.jsx via imperative ref
    heroRef.current?.startEntrance();

    initParticles();
    initMagnetic();
    initScrollTriggers();
  };

  // Shapes / Particles: Idle float (sine wave), soft rotation & mouse parallax with depth
  const initParticles = () => {
    const shapes = Array.from(document.querySelectorAll('.shape'));
    const hero = document.getElementById('hero');
    if (!hero || !shapes.length) return;

    const state = shapes.map((el) => ({
      el,
      depth: parseFloat(el.dataset.depth) || 0.4,
      floatAmp: parseFloat(el.dataset.float) || 1,
      phase: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.15,
      baseRot: (Math.random() - 0.5) * 12,
    }));

    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let time = 0;

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      tx = (e.clientX - rect.left) / rect.width - 0.5;
      ty = (e.clientY - rect.top) / rect.height - 0.5;
    };
    const handleMouseLeave = () => {
      tx = 0;
      ty = 0;
    };

    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);

    const tick = () => {
      time += 0.016;
      mx += (tx - mx) * 0.055;
      my += (ty - my) * 0.055;

      state.forEach((s) => {
        const floatY = Math.sin(time * 0.7 * s.floatAmp + s.phase) * 10 * s.floatAmp;
        const floatX = Math.cos(time * 0.45 * s.floatAmp + s.phase) * 6 * s.floatAmp;
        const px = mx * 55 * s.depth;
        const py = my * 40 * s.depth;
        const rot = s.baseRot + Math.sin(time * s.rotSpeed + s.phase) * 8 + mx * 12 * s.depth;

        s.el.style.transform = `translate3d(${floatX + px}px, ${floatY + py}px, 0) rotate(${rot}deg)`;
      });

      requestAnimationFrame(tick);
    };
    tick();
  };

  // Interactive Magnetic CTAs
  const initMagnetic = () => {
    document.querySelectorAll('.magnetic').forEach((wrap) => {
      const inner = wrap.querySelector('a, button') || wrap;
      const strength = 0.35;

      wrap.addEventListener('mousemove', (e) => {
        const rect = wrap.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(inner, {
          x: x * strength,
          y: y * strength,
          duration: 0.35,
          ease: 'power3.out',
        });
      });

      wrap.addEventListener('mouseleave', () => {
        gsap.to(inner, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.4)',
        });
      });
    });
  };

  // ScrollTrigger for Every Section
  const initScrollTriggers = () => {
    // 01. Principles Strip
    gsap.to('.principle', {
      opacity: 1,
      y: 0,
      duration: 0.75,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.principles',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // 02. About Section
    gsap.to('.about-label', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      scrollTrigger: { trigger: '#about', start: 'top 78%' },
    });
    gsap.to('.about-headline .reveal-line span', {
      y: 0,
      duration: 1,
      stagger: 0.12,
      ease: 'power4.out',
      scrollTrigger: { trigger: '#about', start: 'top 78%' },
    });
    gsap.to('.profile-card-visual', {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.profile-card-visual', start: 'top 85%' },
    });
    gsap.to('.about-text', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.about-right', start: 'top 78%' },
    });
    gsap.to('.stat-item', {
      opacity: 1,
      y: 0,
      duration: 0.65,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.about-stats', start: 'top 85%' },
    });

    // 03. Skills Section
    gsap.to('.skills-label', {
      opacity: 1,
      y: 0,
      duration: 0.55,
      scrollTrigger: { trigger: '#skills', start: 'top 78%' },
    });
    gsap.to('.skills-headline .reveal-line span', {
      y: 0,
      duration: 0.95,
      stagger: 0.1,
      ease: 'power4.out',
      scrollTrigger: { trigger: '#skills', start: 'top 78%' },
    });
    gsap.utils.toArray('.bubble').forEach((bubble, i) => {
      gsap.to(bubble, {
        opacity: 1,
        scale: 1,
        duration: 0.95,
        ease: 'power3.out',
        delay: i * 0.12,
        scrollTrigger: { trigger: '.bubbles-row', start: 'top 82%' },
      });
    });

    // 04. Projects Section
    gsap.to('.projects-label', {
      opacity: 1,
      y: 0,
      duration: 0.55,
      scrollTrigger: { trigger: '#work', start: 'top 80%' },
    });
    gsap.to('.projects-headline .reveal-line span', {
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power4.out',
      scrollTrigger: { trigger: '#work', start: 'top 80%' },
    });
    gsap.to('.projects-header-desc', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#work', start: 'top 80%' },
    });
    gsap.to('.project-filters', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.project-filters', start: 'top 88%' },
    });
    gsap.utils.toArray('.project-row').forEach((project, i) => {
      gsap.fromTo(
        project,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power4.out',
          delay: i * 0.08,
          scrollTrigger: {
            trigger: project,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // 05. Timeline Section
    gsap.to('.timeline-label', {
      opacity: 1,
      y: 0,
      duration: 0.55,
      scrollTrigger: { trigger: '#timeline', start: 'top 78%' },
    });
    gsap.to('.timeline-headline .reveal-line span', {
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power4.out',
      scrollTrigger: { trigger: '#timeline', start: 'top 78%' },
    });
    gsap.to('.timeline-header-desc', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#timeline', start: 'top 78%' },
    });
    gsap.utils.toArray('.timeline-item').forEach((item) => {
      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 86%',
          toggleActions: 'play none none none',
          onEnter: () => item.classList.add('active'),
          onEnterBack: () => item.classList.add('active'),
        },
      });
    });

    // 06. Milestones Section
    gsap.to('.milestones-label', {
      opacity: 1,
      y: 0,
      duration: 0.55,
      scrollTrigger: { trigger: '#milestones', start: 'top 78%' },
    });
    gsap.to('.milestones-headline .reveal-line span', {
      y: 0,
      duration: 0.95,
      stagger: 0.1,
      ease: 'power4.out',
      scrollTrigger: { trigger: '#milestones', start: 'top 78%' },
    });
    gsap.to('.milestones-header-desc', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#milestones', start: 'top 78%' },
    });
    gsap.utils.toArray('.achievement-row').forEach((row, i) => {
      gsap.to(row, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: i * 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: row, start: 'top 92%' },
      });
    });

    // 07. Resume Section
    gsap.to('.cv-label', {
      opacity: 1,
      y: 0,
      duration: 0.55,
      scrollTrigger: { trigger: '#resume', start: 'top 80%' },
    });
    gsap.to('.cv-headline .reveal-line span', {
      y: 0,
      duration: 0.95,
      stagger: 0.1,
      ease: 'power4.out',
      scrollTrigger: { trigger: '#resume', start: 'top 80%' },
    });
    gsap.to('.cv-panel', {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.cv-panel', start: 'top 85%' },
    });

    // 08. Contact Section (Clip-path wipe)
    gsap.to('#contactPanel', {
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.15,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });

    const contactTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 65%',
        toggleActions: 'play none none none',
      },
    });

    contactTl
      .to('.contact-label', { opacity: 0.8, y: 0, duration: 0.5 }, 0.35)
      .to('.contact-heading .reveal-line span', {
        y: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power4.out',
      }, 0.45)
      .to('.contact-sub', { opacity: 0.9, y: 0, duration: 0.7 }, 0.8)
      .to('.contact-form-wrap', { opacity: 1, y: 0, duration: 0.8 }, 0.9);

    // 09. Footer
    gsap.to('.site-footer', {
      opacity: 1,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.site-footer', start: 'top 90%' },
    });
  };

  return (
    <>
      {/* Editorial Preloader */}
      <div className={`loader-screen ${!loading ? 'hidden' : ''}`} id="loader">
        <div className="loader-logo">
          AM<span>.</span>
        </div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" id="loaderBar" />
        </div>
        <div className="loader-percent" id="loaderPercent">
          {loadPercent}%
        </div>
      </div>

      <div className="site-wrapper">
        <Navbar />

        <main>
          <Hero ref={heroRef} profile={portfolio.profile} />
          {/* <Principles /> */}
          <About profile={portfolio.profile} />
          <Skills skillsData={portfolio.skills} />
          <Projects projects={portfolio.projects} />
          <ExperienceTimeline timelineData={portfolio.timeline} />
          <Achievements achievementsData={portfolio.achievements} />
          <ResumeSection />
          <Contact profile={portfolio.profile} />
        </main>

        <Footer profile={portfolio.profile} />
      </div>
    </>
  );
}
