const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Timeline = require('../models/Timeline');
const Achievement = require('../models/Achievement');
const portfolioData = require('../data/portfolioData');

// Seed database if empty
const seedDatabaseIfNeeded = async () => {
  try {
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      console.log('[Seed] Populating MongoDB with initial portfolio projects...');
      await Project.insertMany(portfolioData.projects);
    }

    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      console.log('[Seed] Populating MongoDB with initial skills...');
      await Skill.insertMany(portfolioData.skills);
    }

    const timelineCount = await Timeline.countDocuments();
    if (timelineCount === 0) {
      console.log('[Seed] Populating MongoDB with initial timeline milestones...');
      await Timeline.insertMany(portfolioData.timeline);
    }

    const achievementCount = await Achievement.countDocuments();
    if (achievementCount === 0) {
      console.log('[Seed] Populating MongoDB with initial achievements...');
      await Achievement.insertMany(portfolioData.achievements);
    }
  } catch (err) {
    console.warn('[Seed Warning]', err.message);
  }
};

// @desc   Get entire portfolio data bundle
// @route  GET /api/portfolio
// @access Public
const getPortfolioData = async (req, res) => {
  try {
    await seedDatabaseIfNeeded();

    const [projects, skills, timeline, achievements] = await Promise.all([
      Project.find().sort({ order: 1 }),
      Skill.find().sort({ category: 1, proficiency: -1 }),
      Timeline.find().sort({ order: 1 }),
      Achievement.find().sort({ year: -1 }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        profile: portfolioData.profile,
        projects: projects.length ? projects : portfolioData.projects,
        skills: skills.length ? skills : portfolioData.skills,
        timeline: timeline.length ? timeline : portfolioData.timeline,
        achievements: achievements.length ? achievements : portfolioData.achievements,
      },
    });
  } catch (err) {
    console.error('[Portfolio Data Error]', err);
    // Graceful fallback to static data
    return res.status(200).json({
      success: true,
      data: portfolioData,
    });
  }
};

// @desc   Get Projects
// @route  GET /api/projects
// @access Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects.length ? projects : portfolioData.projects,
    });
  } catch (err) {
    return res.status(200).json({
      success: true,
      data: portfolioData.projects,
    });
  }
};

// @desc   Get Skills
// @route  GET /api/skills
// @access Public
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, proficiency: -1 });
    return res.status(200).json({
      success: true,
      count: skills.length,
      data: skills.length ? skills : portfolioData.skills,
    });
  } catch (err) {
    return res.status(200).json({
      success: true,
      data: portfolioData.skills,
    });
  }
};

// @desc   Get Timeline
// @route  GET /api/timeline
// @access Public
const getTimeline = async (req, res) => {
  try {
    const timeline = await Timeline.find().sort({ order: 1 });
    return res.status(200).json({
      success: true,
      count: timeline.length,
      data: timeline.length ? timeline : portfolioData.timeline,
    });
  } catch (err) {
    return res.status(200).json({
      success: true,
      data: portfolioData.timeline,
    });
  }
};

// @desc   Get Achievements
// @route  GET /api/achievements
// @access Public
const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ year: -1 });
    return res.status(200).json({
      success: true,
      count: achievements.length,
      data: achievements.length ? achievements : portfolioData.achievements,
    });
  } catch (err) {
    return res.status(200).json({
      success: true,
      data: portfolioData.achievements,
    });
  }
};

module.exports = {
  seedDatabaseIfNeeded,
  getPortfolioData,
  getProjects,
  getSkills,
  getTimeline,
  getAchievements,
};
