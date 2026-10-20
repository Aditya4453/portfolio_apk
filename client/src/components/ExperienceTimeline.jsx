import React from 'react';
import { Calendar, Briefcase, GraduationCap, Users } from 'lucide-react';

export default function ExperienceTimeline({ timelineData }) {
  const getIcon = (type) => {
    switch (type) {
      case 'education':
        return <GraduationCap size={15} color="var(--accent)" />;
      case 'experience':
        return <Briefcase size={15} color="var(--accent)" />;
      case 'leadership':
        return <Users size={15} color="var(--accent)" />;
      default:
        return <Calendar size={15} color="var(--accent)" />;
    }
  };

  return (
    <section id="timeline" className="timeline-section container">
      <div className="section-header-center">
        <span className="section-label timeline-label">Trajectory & Milestones</span>
        <h2 className="timeline-headline">
          <span className="reveal-line">
            <span>Education &</span>
          </span>
          <span className="reveal-line">
            <span className="serif">Experience</span>
          </span>
        </h2>
        <p className="timeline-header-desc" style={{ color: 'var(--muted)', marginTop: '0.8rem' }}>
          Academic foundations, technical internships, and student leadership roles.
        </p>
      </div>

      <div className="timeline">
        {(timelineData || []).map((item) => (
          <article className="timeline-item" key={item.title}>
            <div className="timeline-year">{item.year}</div>

            <span className="timeline-dot" />

            <div className="timeline-content">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--muted)',
                  marginBottom: '0.3rem',
                }}
              >
                {getIcon(item.type)}
                <span>{item.type}</span>
              </div>

              <h3 className="timeline-role">{item.title}</h3>
              <p className="timeline-place">
                {item.institution} {item.location ? `· ${item.location}` : ''}
              </p>
              <p className="timeline-desc">{item.description}</p>

              {item.tags?.length > 0 && (
                <div className="timeline-tags">
                  {item.tags.map((tag) => (
                    <span className="timeline-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
