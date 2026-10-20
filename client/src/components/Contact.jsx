import React, { useState } from 'react';
import { Send, Mail, ArrowUpRight, Check, X, Loader } from 'lucide-react';

// btn states: 'idle' | 'loading' | 'success' | 'error'
export default function Contact({ profile }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [btnState, setBtnState] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Reset button if user starts typing after an error
    if (btnState === 'error') setBtnState('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in Name, Email and Message.');
      setBtnState('error');
      setTimeout(() => setBtnState('idle'), 3000);
      return;
    }

    try {
      setBtnState('loading');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setBtnState('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        // Revert button back to idle after 3.5 s
        setTimeout(() => setBtnState('idle'), 3500);
      } else {
        throw new Error(result.error || 'Failed to submit.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Network error — please try again.');
      setBtnState('error');
      setTimeout(() => setBtnState('idle'), 3500);
    }
  };

  /* ── Button content per state ─────────────────────────── */
  const btnContent = {
    idle:    <><span>Send Message</span><Send size={16} /></>,
    loading: <><Loader size={18} className="btn-spinner" /><span>Sending…</span></>,
    success: <><Check size={20} strokeWidth={3} /><span>Message Sent!</span></>,
    error:   <><X size={20} strokeWidth={3} /><span>{errorMsg || 'Something went wrong'}</span></>,
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-panel" id="contactPanel">
        <div className="container">
          <p className="contact-label">HAVE AN IDEA? LET'S CONNECT</p>

          <h2 className="contact-heading">
            <span className="reveal-line"><span>Let's build something</span></span>
            <span className="reveal-line"><span className="serif">worth exploring.</span></span>
          </h2>

          <p className="contact-sub">
            I'm open to meaningful software collaborations, internships, creative experiments,
            and opportunities to build useful things with thoughtful people.
          </p>

          <div className="contact-form-wrap">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text" id="name" name="name"
                    value={formData.name} onChange={handleChange}
                    placeholder="Aditya Verma" required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Your Email *</label>
                  <input
                    type="email" id="email" name="email"
                    value={formData.email} onChange={handleChange}
                    placeholder="name@domain.com" required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text" id="subject" name="subject"
                  value={formData.subject} onChange={handleChange}
                  placeholder="Internship / Project Collaboration / Inquiry"
                />
              </div>

              <div className="form-field">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message" name="message"
                  value={formData.message} onChange={handleChange}
                  placeholder="Share a bit about the opportunity or idea..."
                  required
                />
              </div>

              <div className="magnetic" style={{ width: 'fit-content' }}>
                <button
                  type="submit"
                  className={`form-submit-btn form-submit-btn--${btnState}`}
                  disabled={btnState === 'loading' || btnState === 'success'}
                >
                  {btnContent[btnState]}
                </button>
              </div>
            </form>

            {/* Direct Connect */}
            <div className="contact-direct">
              <div>
                <div className="magnetic">
                  <a
                    href={`mailto:${profile?.email || 'modaniaditya06@gmail.com'}`}
                    className="email-pill-box"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <Mail size={20} />
                      <span>{profile?.email || 'modaniaditya06@gmail.com'}</span>
                    </div>
                    <ArrowUpRight size={20} />
                  </a>
                </div>
              </div>

              <div className="direct-channels">
                <h4>Direct Channels &amp; Profiles</h4>
                <a
                  href={profile?.linkedin || 'https://linkedin.com/in/aditya-modani'}
                  target="_blank" rel="noreferrer" className="channel-link"
                >
                  <span>LinkedIn</span><ArrowUpRight size={18} />
                </a>
                <a
                  href="https://github.com/Aditya4453"
                  target="_blank" rel="noreferrer" className="channel-link"
                >
                  <span>GitHub</span><ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
