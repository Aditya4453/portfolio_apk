import React, { useState } from 'react';
import { FileText, FileDown, Download, Check, Loader2 } from 'lucide-react';

// Base API URL — falls back to same-origin in production (Vite proxy / Vercel rewrite)
const API_BASE = import.meta.env.VITE_API_URL || '';

export default function ResumeSection() {
  // Track per-format state: idle | loading | done | error
  const [pdfState, setPdfState]   = useState('idle');
  const [docxState, setDocxState] = useState('idle');

  /**
   * Fetches the resume from Express as a blob and triggers a browser download.
   * If Express API is unreachable, falls back to the static resume file in public/.
   * @param {'pdf'|'docx'} format
   */
  const handleDownload = async (format) => {
    const setter = format === 'pdf' ? setPdfState : setDocxState;
    setter('loading');

    try {
      const res = await fetch(`${API_BASE}/api/resume/${format}`);
      if (!res.ok) throw new Error(`Server responded ${res.status}`);

      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Aditya_Modani_Resume.${format}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      setter('done');
      setTimeout(() => setter('idle'), 4000);
    } catch (err) {
      const ext = format === 'pdf' ? 'pdf' : 'docx';
      const staticFile = format === 'pdf' ? '/AM_Resume_Sep.pdf' : '/AM_Resume_Sep.docx';
      try {
        const link = document.createElement('a');
        link.href = staticFile;
        link.download = `Aditya_Modani_Resume.${ext}`;
        document.body.appendChild(link);
        link.click();
        link.remove();

        setter('done');
        setTimeout(() => setter('idle'), 4000);
        return;
      } catch (staticErr) {
        console.error(`[Resume Static ${format.toUpperCase()} Download Error]`, staticErr);
      }
      setter('error');
      setTimeout(() => setter('idle'), 4000);
    }
  };

  const btnLabel = (state, label) => {
    if (state === 'loading') return 'Generating…';
    if (state === 'done')    return 'Downloaded!';
    if (state === 'error')   return 'Try again';
    return label;
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

          <p className="cv-subtext">
            Available in both PDF and Word — pick whichever works for you.
          </p>
        </div>

        <div className="cv-actions">
          {/* ── PDF ── */}
          <div className="magnetic">
            <button
              className={`cv-download-btn ${pdfState === 'done' ? 'cv-download-btn--done' : ''} ${pdfState === 'error' ? 'cv-download-btn--error' : ''}`}
              onClick={() => handleDownload('pdf')}
              disabled={pdfState === 'loading'}
              aria-label="Download resume as PDF"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                {pdfState === 'loading'
                  ? <Loader2 size={20} className="cv-spin" />
                  : pdfState === 'done'
                    ? <Check size={20} color="var(--accent)" />
                    : <FileText size={20} color="var(--accent)" />
                }
                <div style={{ textAlign: 'left' }}>
                  <div>{btnLabel(pdfState, 'Aditya Modani — Resume')}</div>
                  <span className="meta">PDF Format</span>
                </div>
              </div>
              <Download size={18} />
            </button>
          </div>

          {/* ── DOCX ── */}
          <div className="magnetic">
            <button
              className={`cv-download-btn ${docxState === 'done' ? 'cv-download-btn--done' : ''} ${docxState === 'error' ? 'cv-download-btn--error' : ''}`}
              onClick={() => handleDownload('docx')}
              disabled={docxState === 'loading'}
              aria-label="Download resume as Word document"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                {docxState === 'loading'
                  ? <Loader2 size={20} className="cv-spin" />
                  : docxState === 'done'
                    ? <Check size={20} color="var(--accent)" />
                    : <FileDown size={20} color="var(--accent)" />
                }
                <div style={{ textAlign: 'left' }}>
                  <div>{btnLabel(docxState, 'Aditya Modani — Resume')}</div>
                  <span className="meta">Word (.docx)</span>
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
