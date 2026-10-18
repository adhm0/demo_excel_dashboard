const express = require('express');
const cors = require('cors');
const path = require('path');
const { db } = require('./db');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Handle Vercel URL rewrite edge cases where req.url might have been rewritten to /api/index.js
app.use((req, res, next) => {
  if (req.url.startsWith('/api/index.js') && req.originalUrl) {
    req.url = req.originalUrl;
  }
  next();
});

// Lazy DB initialization middleware (guarantees workbook is loaded before handling API requests in serverless)
let initPromise = null;
app.use(async (req, res, next) => {
  if (!db.workbook) {
    if (!initPromise) {
      initPromise = db.init().catch(err => {
        initPromise = null;
        throw err;
      });
    }
    try {
      await initPromise;
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Database initialization failed: ' + (err.message || String(err))
      });
    }
  }
  next();
});

// API Routes
app.use('/api', routes);

// Fallback for API routes if /api was stripped during serverless rewrite
app.use((req, res, next) => {
  if (req.path.startsWith('/workbook') || req.path.startsWith('/locations') ||
      req.path.startsWith('/taxonomy') || req.path.startsWith('/properties') ||
      req.path.startsWith('/bookable-units') || req.path.startsWith('/eav-schema') ||
      req.path.startsWith('/sheets') || req.path.startsWith('/translations') ||
      req.path.startsWith('/countries') || req.path.startsWith('/cities') ||
      req.path.startsWith('/districts') || req.path.startsWith('/property-')) {
    return routes(req, res, next);
  }
  next();
});

// Static frontend assets
app.use(express.static(path.resolve(__dirname, '..', 'public')));

// Fallback to index.html for SPA routing (Express 5 compatible)
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  }
  next();
});

// Server Initialization
async function startServer() {
  try {
    console.log('[Server] Initializing Excel database...');
    await db.init();
    console.log('[Server] Database initialized.');

    app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`  PROPERTY ENGINE SIMULATION DASHBOARD RUNNING`);
      console.log(`  Local URL: http://localhost:${PORT}`);
      console.log(`  Workbook:  property_engine.xlsx (Single Source of Truth)`);
      console.log(`=======================================================`);
    });
  } catch (err) {
    console.error('[Server Fatal Error]:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = app;
