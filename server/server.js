require('dotenv').config();
const path = require('path');
const fs   = require('fs');
const express = require('express');
const cors    = require('cors');
const { connectDB } = require('./config/db');

// Route Imports
const contactRoutes   = require('./routes/contactRoutes');
const resumeRoutes    = require('./routes/resumeRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const {
  getProjects,
  getSkills,
  getTimeline,
  getAchievements,
} = require('./controllers/portfolioController');

const app  = express();
const PORT = process.env.PORT || 5000;
const IS_PROD = process.env.NODE_ENV === 'production';

// ── Database ────────────────────────────────────────────────────────────────
connectDB();

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: IS_PROD
    ? ['https://portfolio-apk.onrender.com', 'https://client-ebon-theta-89.vercel.app']
    : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  if (!IS_PROD) {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  }
  next();
});

// ── API Routes ──────────────────────────────────────────────────────────────
app.use('/api/contact',   contactRoutes);
app.use('/api/resume',    resumeRoutes);
app.use('/api/portfolio', portfolioRoutes);

app.get('/api/projects',    getProjects);
app.get('/api/skills',      getSkills);
app.get('/api/timeline',    getTimeline);
app.get('/api/achievements', getAchievements);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status:    'healthy',
    timestamp: new Date().toISOString(),
    version:   '1.0.0',
    service:   'Aditya Modani MERN Portfolio API',
  });
});

// ── Serve React frontend ────────────────────────────────────────────────────
// When running from the repo root (Render): __dirname = <repo>/server
// client/dist is always one level up from server/
const clientDistPath   = path.resolve(__dirname, '../client/dist');
const frontendIndex    = path.join(clientDistPath, 'index.html');

console.log(`[Static] dist path  : ${clientDistPath}`);
console.log(`[Static] index.html : ${frontendIndex}`);
console.log(`[Static] exists     : ${fs.existsSync(frontendIndex)}`);

if (fs.existsSync(frontendIndex)) {
  // Serve hashed JS/CSS/images from dist/assets
  app.use(express.static(clientDistPath));

  // SPA fallback — send index.html for every non-API route
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({
        success: false,
        error:   `API route not found: ${req.originalUrl}`,
      });
    }
    res.sendFile(frontendIndex, (err) => {
      if (err) next(err);
    });
  });
} else {
  // Build was not executed — give a clear 500 so it's obvious in Render logs
  console.error(`[FATAL] Frontend build missing at ${frontendIndex}`);
  console.error('[FATAL] Render build command must run: cd client && npm install && npm run build');

  app.use((req, res) => {
    res.status(500).json({
      error: 'Frontend build not found.',
      hint:  'Build command: cd client && npm install && npm run build',
      path:  frontendIndex,
    });
  });
}

// ── Global error handler ────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[Global Error]', err.stack);
  res.status(500).json({
    success: false,
    error:   'Internal server error.',
    message: !IS_PROD ? err.message : undefined,
  });
});

// ── Start ────────────────────────────────────────────────────────────────────
// Bind 0.0.0.0 — required on Render (and most PaaS platforms)
app.listen(PORT, '0.0.0.0', () => {
  console.log('===============================================');
  console.log(`⚡  Server        : http://0.0.0.0:${PORT}`);
  console.log(`�  Health        : http://0.0.0.0:${PORT}/api/health`);
  console.log(`🌐  Portfolio API : http://0.0.0.0:${PORT}/api/portfolio`);
  console.log(`�  Contact API   : http://0.0.0.0:${PORT}/api/contact`);
  console.log(`�  Resume PDF    : http://0.0.0.0:${PORT}/api/resume/pdf`);
  console.log('===============================================');
});
