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

// Static frontend assets
app.use(express.static(path.resolve(__dirname, '..', 'public')));

// API Routes
app.use('/api', routes);

// Fallback to index.html for SPA routing (Express 5 compatible)
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
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

startServer();
