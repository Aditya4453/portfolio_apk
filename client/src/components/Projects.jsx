import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Projects({ projects }) {
  const [filter, setFilter] = useState('All');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const filterOptions = ['All', 'AI & ML', 'Full-Stack', 'Web3', 'Creative & Frontend'];

  const filteredProjects = (projects || []).filter((item) => {
    if (filter === 'All') return true;
    if (filter === 'AI & ML') return item.category.includes('AI') || item.category.includes('VISION') || item.category.includes('ML');
    if (filter === 'Full-Stack') return item.category.includes('FULL-STACK') || item.category.includes('TRANSIT');
    if (filter === 'Web3') return item.category.includes('WEB3');
    if (filter === 'Creative & Frontend') return item.category.includes('FRONT-END') || item.category.includes('CREATIVE');
    return true;
  });

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="work" className="projects-section container">
      <div className="section-header-split">
        <div>
          <span className="section-label projects-label">Selected Works</span>
          <h2 className="projects-headline">
            <span className="reveal-line">
              <span>Featured</span>
            </span>
            <span className="reveal-line">
              <span>Projects<span style={{ color: 'var(--accent)' }}>.</span></span>
            </span>
          </h2>
        </div>
        <div>
          <p className="projects-header-desc">
            A curated selection of technical applications, machine learning experiments, and interactive web software built with precision and purpose.
          </p>

        </div>
      </div>

      {/* Filter Tabs */}


      {/* Project Rows */}
      <div className="project-list">
        {filteredProjects.map((project, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <article
              className={`project-row ${isExpanded ? 'is-expanded' : ''}`}
              key={project.title}
              onClick={() => toggleExpand(idx)}
              onMouseEnter={() => setExpandedIndex(idx)}
              onMouseLeave={() => setExpandedIndex(null)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleExpand(idx);
                }
              }}
              aria-expanded={isExpanded}
            >
              <span className="project-num">0{idx + 1}</span>

              <div className="project-main">
                {/* Always visible: Heading */}
                <h3 className="project-title">{project.title}</h3>

                {/* Always visible: Tagline / Headline */}
                <p className="project-tagline">
                  {project.tagline}
                </p>

                {/* Vertically expandable on hover — reveals meta, description, stack, links */}
                <div className="project-expandable">
                  <div className="project-expandable-inner">
                    {/* Category & Year shown inside expand */}
                    <div className="project-meta-badges" style={{ marginBottom: '0.75rem' }}>
                      <span className="project-category">{project.category}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>· {project.year}</span>
                    </div>

                    <p className="project-desc">{project.description}</p>

                    <div className="project-stack-wrap">
                      {project.stack?.map((tech) => (
                        <span className="stack-badge" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="project-links" onClick={(e) => e.stopPropagation()}>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="project-link-btn"
                        >
                          <GithubIcon size={14} />
                          GitHub Repo
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="project-link-btn primary-link"
                        >
                          <ExternalLink size={14} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="project-arrow-circle" aria-label="Toggle project details">
                <ArrowUpRight size={20} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
