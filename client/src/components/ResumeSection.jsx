import React, { useState } from 'react';
import { FileText, Download, Check } from 'lucide-react';

const RESUME_PATH = '/AM_Resume_Sep.pdf';
const RESUME_FILENAME = 'Aditya_Modani_Resume.pdf';

export default function ResumeSection() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = RESUME_PATH;
    link.download = RESUME_FILENAME;
    document.body.appendChild(link);
    link.click();
    link.remove();

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 4000);
  };

  return (
    <section id="resume" className="cv-section container">
      <div className="cv-panel">
        <div>
          <span className="section-label cv-label">Curriculum Vitae</span>
          <h2 className="cv-headline">
            <span className="reveal-line">
              <span>Download my</span>
            </span>
            <span className="reveal-line">
              <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
                Resume
              </span>
            </span>
          </h2>

          {downloaded && (
            <div className="cv-success">
              <Check size={15} />
              Resume downloaded successfully!
            </div>
          )}
        </div>

        <div className="cv-actions">
          <div className="magnetic">
            <button
              className="cv-download-btn"
              onClick={handleDownload}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <FileText size={20} color="var(--accent)" />
                <div style={{ textAlign: 'left' }}>
                  <div>Aditya Modani — Resume</div>
                  <span className="meta">PDF · Updated Sep 2025</span>
                </div>
              </div>
              <Download size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
