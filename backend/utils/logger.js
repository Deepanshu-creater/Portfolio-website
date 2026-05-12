/**
 * Logger Utility
 * Simple but effective logging system for production
 */

const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const getLogLevel = () => process.env.LOG_LEVEL || 'info';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

const colors = {
  error: '\x1b[31m',    // Red
  warn: '\x1b[33m',     // Yellow
  info: '\x1b[36m',     // Cyan
  debug: '\x1b[35m',    // Magenta
  reset: '\x1b[0m'      // Reset
};

const log = (level, message, data = {}) => {
  if (levels[level] > levels[getLogLevel()]) return;

  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  const dataStr = Object.keys(data).length > 0 ? JSON.stringify(data, null, 2) : '';

  // Console output with color
  if (process.env.NODE_ENV !== 'production') {
    console.log(
      `${colors[level]}${logMessage}${colors.reset}${dataStr ? '\n' + dataStr : ''}`
    );
  }

  // File output
  const logFile = path.join(logDir, `${level}.log`);
  const logEntry = `${logMessage}${dataStr ? '\n' + dataStr : ''}\n`;

  fs.appendFileSync(logFile, logEntry, (err) => {
    if (err) console.error('Error writing to log file:', err);
  });
};

module.exports = {
  error: (message, data) => log('error', message, data),
  warn: (message, data) => log('warn', message, data),
  info: (message, data) => log('info', message, data),
  debug: (message, data) => log('debug', message, data)
};
