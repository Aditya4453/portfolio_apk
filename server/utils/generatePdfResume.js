const PDFDocument = require('pdfkit');
const portfolioData = require('../data/portfolioData');

const generatePdfResume = () => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        margin: 40,
        size: 'A4',
        info: {
          Title: 'Aditya Modani - Resume',
          Author: 'Aditya Modani',
          Subject: 'Full Stack & Software Engineering Resume',
        },
      });

      const buffers = [];
      doc.on('data', (data) => buffers.push(data));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (err) => reject(err));

      // Theme Colors
      const primaryColor = '#111111';
      const accentColor = '#3b82f6';
      const secondaryColor = '#4b5563';
      const dividerColor = '#e5e7eb';

      // Header: Name & Contact
      doc.fontSize(22).font('Helvetica-Bold').fillColor(primaryColor).text(portfolioData.profile.name, { align: 'left' });
      doc.fontSize(10.5).font('Helvetica').fillColor(accentColor).text(portfolioData.profile.eyebrow, { align: 'left' });
      doc.moveDown(0.3);

      doc.fontSize(8.5).font('Helvetica').fillColor(secondaryColor).text(
        `Email: ${portfolioData.profile.email}  |  Location: ${portfolioData.profile.location}  |  GitHub: ${portfolioData.profile.github}  |  LinkedIn: ${portfolioData.profile.linkedin}`
      );
      doc.moveDown(0.6);

      // Helper function to draw section header
      const drawSectionHeader = (title) => {
        doc.moveDown(0.5);
        doc.fontSize(11).font('Helvetica-Bold').fillColor(primaryColor).text(title.toUpperCase());
        const y = doc.y + 2;
        doc.strokeColor(accentColor).lineWidth(1.5).moveTo(doc.page.margins.left, y).lineTo(doc.page.width - doc.page.margins.right, y).stroke();
        doc.moveDown(0.5);
      };

      // Summary
      drawSectionHeader('Professional Summary');
      doc.fontSize(8.5).font('Helvetica').fillColor(primaryColor).text(portfolioData.profile.bio, {
        align: 'justify',
        lineGap: 2,
      });

      // Education
      drawSectionHeader('Education');
      doc.fontSize(9.5).font('Helvetica-Bold').fillColor(primaryColor).text('B.Tech in Computer Science & Engineering');
      doc.fontSize(8.5).font('Helvetica-Oblique').fillColor(secondaryColor).text('JK Lakshmipat University, Jaipur, India (Expected 2028)');
      doc.fontSize(8).font('Helvetica').fillColor(primaryColor).text('Core: Data Structures, Algorithms, Computer Networks, Operating Systems, Database Management Systems, AI/ML.');

      // Technical Skills
      drawSectionHeader('Technical Skills');
      const frontendSkills = portfolioData.skills.filter(s => s.category === 'Frontend').map(s => s.name).join(', ');
      const backendSkills = portfolioData.skills.filter(s => s.category === 'Backend').map(s => s.name).join(', ');
      const toolsSkills = portfolioData.skills.filter(s => s.category === 'Tools & Technologies').map(s => s.name).join(', ');
      const aiSkills = portfolioData.skills.filter(s => s.category === 'AI & ML').map(s => s.name).join(', ');

      doc.fontSize(8.5).font('Helvetica-Bold').fillColor(primaryColor).text('Frontend: ', { continued: true })
        .font('Helvetica').fillColor(secondaryColor).text(frontendSkills);
      doc.fontSize(8.5).font('Helvetica-Bold').fillColor(primaryColor).text('Backend & Database: ', { continued: true })
        .font('Helvetica').fillColor(secondaryColor).text(backendSkills);
      doc.fontSize(8.5).font('Helvetica-Bold').fillColor(primaryColor).text('Tools & DevOps: ', { continued: true })
        .font('Helvetica').fillColor(secondaryColor).text(toolsSkills);
      doc.fontSize(8.5).font('Helvetica-Bold').fillColor(primaryColor).text('AI / Machine Learning: ', { continued: true })
        .font('Helvetica').fillColor(secondaryColor).text(aiSkills);

      // Experience & Leadership
      drawSectionHeader('Experience & Community Leadership');
      portfolioData.timeline.filter(t => t.type !== 'education').forEach((item) => {
        doc.fontSize(9.5).font('Helvetica-Bold').fillColor(primaryColor).text(`${item.title}  —  ${item.institution}`, { continued: true });
        doc.fontSize(8.5).font('Helvetica-Oblique').fillColor(accentColor).text(`  (${item.year})`, { align: 'right' });
        doc.fontSize(8).font('Helvetica').fillColor(secondaryColor).text(item.description, { lineGap: 1.5 });
        doc.moveDown(0.3);
      });

      // Key Projects
      drawSectionHeader('Featured Technical Projects');
      portfolioData.projects.slice(0, 4).forEach((proj) => {
        doc.fontSize(9.5).font('Helvetica-Bold').fillColor(primaryColor).text(`${proj.title}  [${proj.category}]`, { continued: true });
        doc.fontSize(8.5).font('Helvetica-Oblique').fillColor(accentColor).text(`  (${proj.year})`, { align: 'right' });
        doc.fontSize(8).font('Helvetica').fillColor(secondaryColor).text(proj.description);
        doc.fontSize(8).font('Helvetica-Bold').fillColor(primaryColor).text('Tech Stack: ', { continued: true })
          .font('Helvetica').fillColor(accentColor).text(proj.stack.join(', '));
        doc.moveDown(0.3);
      });

      // Milestones & Certifications
      drawSectionHeader('Certifications & Milestones');
      portfolioData.achievements.forEach((ach) => {
        doc.fontSize(8.5).font('Helvetica-Bold').fillColor(primaryColor).text(`• ${ach.title}`, { continued: true })
          .font('Helvetica').fillColor(secondaryColor).text(` — ${ach.organization} (${ach.year})`);
      });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { generatePdfResume };
