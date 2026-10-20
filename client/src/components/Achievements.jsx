import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';

export default function Achievements({ achievementsData }) {
  return (
    <section id="milestones" className="achievements-section">
      <div className="container">
        <div style={{ marginBottom: '3.5rem' }}>
          <span className="section-label milestones-label">Certifications & Hackathons</span>
          <h2
            className="milestones-headline"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
            }}
          >
            <span className="reveal-line">
              <span>Milestones &</span>
            </span>
            <span className="reveal-line">
              <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
                Community
              </span>
            </span>
          </h2>
          <p className="milestones-header-desc" style={{ color: 'var(--muted)', marginTop: '0.6rem', fontSize: '1rem' }}>
            Verified open-source contribution programs, technical bootcamps, and hackathon recognitions.
          </p>
        </div>

        <div className="achievements-list">
          {(achievementsData || []).map((item) => (
            <div className="achievement-row" key={item.title}>
              <span className="achievement-year">{item.year}</span>

              <div className="achievement-title-group">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>

              <div className="achievement-org">
                <span className="achievement-badge">
                  <ShieldCheck size={13} />
                  {item.badge || 'Verified'}
                </span>
                <span>{item.organization}</span>
                {item.certificateUrl && (
                  <a
                    href={item.certificateUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      color: 'var(--accent)',
                      fontSize: '0.8rem',
                      marginTop: '0.2rem',
                    }}
                  >
                    View Credential <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
