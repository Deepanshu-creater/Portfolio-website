/**
 * Input Validation Middleware
 * Validates and sanitizes incoming request data
 */

const validateContactForm = (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // Check required fields exist
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, and message are required',
        errors: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          message: !message ? 'Message is required' : null
        }
      });
    }

    // Validate name
    const nameStr = String(name).trim();
    if (nameStr.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name validation failed',
        errors: { name: 'Name must be at least 2 characters long' }
      });
    }
    if (nameStr.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Name validation failed',
        errors: { name: 'Name cannot exceed 100 characters' }
      });
    }

    // Validate email
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const emailStr = String(email).trim().toLowerCase();
    if (!emailRegex.test(emailStr)) {
      return res.status(400).json({
        success: false,
        message: 'Email validation failed',
        errors: { email: 'Please provide a valid email address' }
      });
    }

    // Validate message
    const messageStr = String(message).trim();
    if (messageStr.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message validation failed',
        errors: { message: 'Message must be at least 10 characters long' }
      });
    }
    if (messageStr.length > 5000) {
      return res.status(400).json({
        success: false,
        message: 'Message validation failed',
        errors: { message: 'Message cannot exceed 5000 characters' }
      });
    }

    // Pass sanitized data to next middleware
    req.body = {
      name: nameStr,
      email: emailStr,
      message: messageStr
    };

    req.clientIp = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;

    next();
  } catch (error) {
    console.error('Validation middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Validation error occurred',
      error: error.message
    });
  }
};

module.exports = {
  validateContactForm
};
