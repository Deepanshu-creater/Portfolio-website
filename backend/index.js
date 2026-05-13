/**
 * Portfolio Backend Server
 * Main entry point for the Express application
 * Handles contact form submissions and email notifications
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./utils/logger');
const { errorHandler } = require('./middleware/errorHandler');
const contactRoutes = require('./routes/contact');

// Initialize Express app
const app = express();

// ============================================
// MIDDLEWARE CONFIGURATION
// ============================================

// CORS Configuration
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL,
    "https://myportfolio-ten-iota.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000"
  ].filter(Boolean),
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: 3600
};

app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.debug(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

// ============================================
// HEALTH CHECK ENDPOINT
// ============================================

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// ============================================
// API ROUTES
// ============================================

app.use('/api/contact', contactRoutes);

// Fallback for old endpoint (for backward compatibility)
app.post('/api/users', (req, res) => {
  return res.status(301).json({
    success: false,
    message: 'This endpoint has been moved. Please use POST /api/contact instead.'
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path,
    method: req.method
  });
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

app.use(errorHandler);

// ============================================
// DATABASE CONNECTION
// ============================================

let dbConnected = false;

const connectDatabase = async () => {
  try {
    const dbUrl = process.env.DBURL;

    if (!dbUrl) {
      throw new Error('DBURL environment variable is not set');
    }

    await mongoose.connect(dbUrl, {
      serverSelectionTimeoutMS: 5000
    });

    logger.info('MongoDB connected successfully', {
      database: dbUrl.includes('mongodb.net') ? 'MongoDB Atlas' : 'Local MongoDB'
    });

    dbConnected = true;
    return true;
  } catch (error) {
    logger.warn('MongoDB connection failed', {
      error: error.message,
      dbUrl: process.env.DBURL ? (process.env.DBURL.includes('mongodb.net') ? 'MongoDB Atlas' : 'Local MongoDB') : 'not set',
      hint: 'Make sure MongoDB is running or configure DBURL to use MongoDB Atlas'
    });
    return false;
  }
};

// ============================================
// SERVER STARTUP
// ============================================

const startServer = async () => {
  try {
    // Validate critical environment variables
    const requiredEnvVars = ['DBURL', 'EMAILJS_SERVICE_ID', 'EMAILJS_TEMPLATE_ID', 'EMAILJS_PUBLIC_KEY'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
      logger.warn('Missing environment variables', { missing: missingVars });
    }

    // Attempt to connect to database (non-blocking)
    await connectDatabase();

    if (!dbConnected) {
      logger.warn('Starting server in demo mode without database - contact form will not work');
    }

    // Start server
    const PORT = process.env.PORT || 8000;

   const server = app.listen(PORT, () => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://portfolio-website-wk4v.onrender.com"
      : `http://localhost:${PORT}`;

  logger.info("Server started successfully", {
    port: PORT,
    environment: process.env.NODE_ENV || "development",
    url: baseUrl,
    databaseStatus: dbConnected ? "connected" : "disconnected"
  });

  console.log(`Server is running on ${baseUrl}`);
});
    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        logger.info('HTTP server closed');
        if (dbConnected) {
          mongoose.connection.close(false, () => {
            logger.info('MongoDB connection closed');
            process.exit(0);
          });
        } else {
          process.exit(0);
        }
      });
    });

    process.on('SIGINT', () => {
      logger.info('SIGINT signal received: closing HTTP server');
      server.close(() => {
        logger.info('HTTP server closed');
        if (dbConnected) {
          mongoose.connection.close(false, () => {
            logger.info('MongoDB connection closed');
            process.exit(0);
          });
        } else {
          process.exit(0);
        }
      });
    });

    // Unhandled promise rejection
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection at', {
        promise: promise.toString(),
        reason: reason.toString()
      });
    });

  } catch (error) {
    logger.error('Fatal error during server startup', {
      error: error.message,
      stack: error.stack
    });
    process.exit(1);
  }
};

// Start the server
startServer();

module.exports = app;

