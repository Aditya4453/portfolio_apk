const express = require('express');
const router = express.Router();
const { downloadPdf, downloadDocx, getResumeInfo } = require('../controllers/resumeController');

router.get('/pdf', downloadPdf);
router.get('/docx', downloadDocx);
router.get('/info', getResumeInfo);

module.exports = router;
