const express = require('express');
const router = express.Router();
const {
  getPortfolioData,
  getProjects,
  getSkills,
  getTimeline,
  getAchievements,
} = require('../controllers/portfolioController');

router.get('/', getPortfolioData);
router.get('/projects', getProjects);
router.get('/skills', getSkills);
router.get('/timeline', getTimeline);
router.get('/achievements', getAchievements);

module.exports = router;
