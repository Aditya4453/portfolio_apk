const path = require('path');
const fs = require('fs');
const { generatePdfResume } = require('../utils/generatePdfResume');
const { generateDocxResume } = require('../utils/generateDocxResume');
const portfolioData = require('../data/portfolioData');

// @desc   Download Resume in PDF format
// @route  GET /api/resume/pdf
// @access Public
const downloadPdf = async (req, res) => {
  try {
    const candidatePaths = [
      path.resolve(__dirname, '../public/AM_Resume_Sep.pdf'),
      path.resolve(__dirname, '../../client/public/AM_Resume_Sep.pdf'),
      path.resolve(__dirname, '../../client/dist/AM_Resume_Sep.pdf'),
    ];

    for (const filePath of candidatePaths) {
      if (fs.existsSync(filePath)) {
        return res.download(filePath, 'Aditya_Modani_Resume.pdf');
      }
    }

    const pdfBuffer = await generatePdfResume();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Aditya_Modani_Resume.pdf"');
    res.setHeader('Content-Length', pdfBuffer.length);

    return res.end(pdfBuffer);
  } catch (err) {
    console.error('[PDF Download Error]', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate PDF resume. Please try again.',
    });
  }
};

// @desc   Download Resume in Word (.docx) format
// @route  GET /api/resume/docx
// @access Public
const downloadDocx = async (req, res) => {
  try {
    const candidatePaths = [
      path.resolve(__dirname, '../public/AM_Resume_Sep.docx'),
      path.resolve(__dirname, '../../client/public/AM_Resume_Sep.docx'),
      path.resolve(__dirname, '../../client/dist/AM_Resume_Sep.docx'),
    ];

    for (const filePath of candidatePaths) {
      if (fs.existsSync(filePath)) {
        return res.download(filePath, 'Aditya_Modani_Resume.docx');
      }
    }

    const docxBuffer = await generateDocxResume();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    res.setHeader('Content-Disposition', 'attachment; filename="Aditya_Modani_Resume.docx"');
    res.setHeader('Content-Length', docxBuffer.length);

    return res.end(docxBuffer);
  } catch (err) {
    console.error('[DOCX Download Error]', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate Word resume. Please try again.',
    });
  }
};

// @desc   Get Resume details preview
// @route  GET /api/resume/info
// @access Public
const getResumeInfo = (req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      name: portfolioData.profile.name,
      title: portfolioData.profile.eyebrow,
      formats: [
        { type: 'PDF', endpoint: '/api/resume/pdf', filename: 'Aditya_Modani_Resume.pdf', size: '~60 KB' },
        { type: 'DOCX', endpoint: '/api/resume/docx', filename: 'Aditya_Modani_Resume.docx', size: '~25 KB' },
      ],
      lastUpdated: new Date().toISOString(),
    },
  });
};

module.exports = {
  downloadPdf,
  downloadDocx,
  getResumeInfo,
};
