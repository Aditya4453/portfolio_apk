const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);



require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

// Route Imports
const contactRoutes = require('./routes/contactRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const {
  getProjects,
  getSkills,
  getTimeline,
  getAchievements,
} = require('./controllers/portfolioController');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger for development
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Direct convenience routes for specific resource collections
app.get('/api/projects', getProjects);
app.get('/api/skills', getSkills);
app.get('/api/timeline', getTimeline);
app.get('/api/achievements', getAchievements);

// Root / Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    service: 'Aditya Modani MERN Portfolio API',
  });
});

// Serve frontend build if dist exists
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api')) {
    return res.status(404).json({
      success: false,
      error: `API route not found: ${req.originalUrl}`,
    });
  }
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) next();
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Global Error]', err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error occurred.',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

const server = app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`⚡ MERN Portfolio Server running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📄 PDF Resume:   http://localhost:${PORT}/api/resume/pdf`);
  console.log(`📝 DOCX Resume:  http://localhost:${PORT}/api/resume/docx`);
  console.log(`📬 Contact API:  http://localhost:${PORT}/api/contact`);
  console.log(`🌐 Portfolio:    http://localhost:${PORT}/api/portfolio`);
  console.log(`💼 Projects:     http://localhost:${PORT}/api/projects`);
  console.log(`🛠️ Skills:       http://localhost:${PORT}/api/skills`);
  console.log(`⏳ Timeline:     http://localhost:${PORT}/api/timeline`);
  console.log(`🏆 Achievements: http://localhost:${PORT}/api/achievements`);
  console.log(`===============================================`);
});

module.exports = { app, server };
