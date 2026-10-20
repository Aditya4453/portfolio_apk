const { Document, Packer, Paragraph, TextRun, HeadingLevel, BorderStyle } = require('docx');
const portfolioData = require('../data/portfolioData');

const generateDocxResume = async () => {
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children: [
          // Header
          new Paragraph({
            children: [
              new TextRun({
                text: portfolioData.profile.name,
                bold: true,
                size: 36,
                color: '111827',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: portfolioData.profile.eyebrow,
                bold: true,
                color: '2563EB',
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Email: ${portfolioData.profile.email}  |  Location: ${portfolioData.profile.location}  |  GitHub: ${portfolioData.profile.github}`,
                size: 18,
                color: '4B5563',
              }),
            ],
          }),
          new Paragraph({ text: '' }),

          // Professional Summary
          new Paragraph({
            text: 'PROFESSIONAL SUMMARY',
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: portfolioData.profile.bio,
                size: 19,
              }),
            ],
          }),
          new Paragraph({ text: '' }),

          // Education
          new Paragraph({
            text: 'EDUCATION',
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'B.Tech in Computer Science & Engineering — JK Lakshmipat University, Jaipur (2024 — 2028)',
                bold: true,
                size: 20,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Key Areas: Data Structures, Algorithms, Computer Networks, Operating Systems, Full-Stack Web Development, Applied Machine Learning.',
                size: 18,
                color: '4B5563',
              }),
            ],
          }),
          new Paragraph({ text: '' }),

          // Technical Skills
          new Paragraph({
            text: 'TECHNICAL SKILLS',
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Frontend: ', bold: true, size: 19 }),
              new TextRun({ text: portfolioData.skills.filter(s => s.category === 'Frontend').map(s => s.name).join(', '), size: 19 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Backend & Database: ', bold: true, size: 19 }),
              new TextRun({ text: portfolioData.skills.filter(s => s.category === 'Backend').map(s => s.name).join(', '), size: 19 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Tools & Platforms: ', bold: true, size: 19 }),
              new TextRun({ text: portfolioData.skills.filter(s => s.category === 'Tools & Technologies').map(s => s.name).join(', '), size: 19 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• AI & Machine Learning: ', bold: true, size: 19 }),
              new TextRun({ text: portfolioData.skills.filter(s => s.category === 'AI & ML').map(s => s.name).join(', '), size: 19 }),
            ],
          }),
          new Paragraph({ text: '' }),

          // Experience
          new Paragraph({
            text: 'EXPERIENCE & LEADERSHIP',
            heading: HeadingLevel.HEADING_2,
          }),
          ...portfolioData.timeline.filter(t => t.type !== 'education').flatMap((item) => [
            new Paragraph({
              children: [
                new TextRun({ text: `${item.title} — ${item.institution}`, bold: true, size: 20 }),
                new TextRun({ text: `  [${item.year}]`, italics: true, color: '2563EB', size: 18 }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: item.description, size: 18, color: '374151' }),
              ],
            }),
            new Paragraph({ text: '' }),
          ]),

          // Projects
          new Paragraph({
            text: 'FEATURED PROJECTS',
            heading: HeadingLevel.HEADING_2,
          }),
          ...portfolioData.projects.slice(0, 4).flatMap((proj) => [
            new Paragraph({
              children: [
                new TextRun({ text: `${proj.title} (${proj.category})`, bold: true, size: 20 }),
                new TextRun({ text: ` — ${proj.year}`, italics: true, size: 18, color: '2563EB' }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: proj.description, size: 18, color: '374151' }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Stack: ', bold: true, size: 18 }),
                new TextRun({ text: proj.stack.join(', '), size: 18, color: '2563EB' }),
              ],
            }),
            new Paragraph({ text: '' }),
          ]),

          // Milestones
          new Paragraph({
            text: 'MILESTONES & ACHIEVEMENTS',
            heading: HeadingLevel.HEADING_2,
          }),
          ...portfolioData.achievements.map((ach) =>
            new Paragraph({
              children: [
                new TextRun({ text: `• ${ach.title} `, bold: true, size: 19 }),
                new TextRun({ text: `— ${ach.organization} (${ach.year})`, size: 18, color: '4B5563' }),
              ],
            })
          ),
        ],
      },
    ],
  });

  return await Packer.toBuffer(doc);
};

module.exports = { generateDocxResume };
