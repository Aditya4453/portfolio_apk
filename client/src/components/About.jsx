import React from 'react';
import { MapPin, GraduationCap, Terminal, Sparkles } from 'lucide-react';

export default function About({ profile }) {
  return (
    <section id="about" className="about-section container">
      <div className="about-grid">
        {/* Left Column: Visual & Status Card */}
        <div className="about-left">
          <span className="section-label about-label">About Me</span>
          <h2 className="about-headline">
            <span className="reveal-line">
              <span>Curious by nature.</span>
            </span>
            <span className="reveal-line">
              <span className="serif">A builder by choice.</span>
            </span>
          </h2>


        </div>

        {/* Right Column: Bio Narrative & Stats */}
        <div className="about-right">
          <p className="about-text">
            I'm Aditya, a Computer Science student at{' '}
            <strong style={{ color: 'var(--fg)' }}>JK Lakshmipat University, Jaipur</strong>. I enjoy understanding how complex software works under the hood, turning architectural concepts into functional products, and crafting digital experiences that feel as fluid and refined as they are performant.
          </p>

          <p className="about-text">
            My journey bridges full-stack web development (the MERN stack), applied AI and machine learning experiments (computer vision, pose estimation, and RAG retrieval pipelines), and creative digital production. I thrive moving between these realms — writing maintainable backend logic, engineering responsive frontends, or polishing micro-interactions.
          </p>

          <p className="about-text">
            Beyond code, I work in video and motion: editing short films, reels and event recaps in{' '}
            <strong style={{ color: 'var(--fg)' }}>DaVinci Resolve</strong>, compositing and motion graphics in{' '}
            <strong style={{ color: 'var(--fg)' }}>After Effects</strong>, and assembling timelines in{' '}
            <strong style={{ color: 'var(--fg)' }}>Premiere Pro</strong>. That side of the craft directly informs how I think about animation, pacing, and visual storytelling inside the browser.
          </p>

          <p className="about-text">
            I'm constantly building, experimenting in hackathons and open-source programs, and deliberately expanding the engineering craft that will shape my professional journey.
          </p>

          {/* Quick Stats Grid */}
          <div className="about-stats">
            <div className="stat-item">
              <h4>
                6<span>+</span>
              </h4>
              <p>Key Projects Built</p>
            </div>
            <div className="stat-item">
              <h4>
                15<span>+</span>
              </h4>
              <p>Technologies & Tools</p>
            </div>
            <div className="stat-item">
              <h4>
                3<span>+</span>
              </h4>
              <p>Community Milestones</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
