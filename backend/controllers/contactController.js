/**
 * Contact Controller
 * Handles contact form submissions and email notifications
 */

const Enquirymodel = require('../schema');
const { sendConfirmationEmail, sendAdminNotificationEmail } = require('../utils/emailService');
const logger = require('../utils/logger');

/**
 * Create and save a new enquiry
 * @route POST /api/contact
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createEnquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const clientIp = req.clientIp || 'unknown';

    logger.debug('Processing enquiry', { email, name });

    // Check for duplicate email within 24 hours (anti-spam measure)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingEnquiry = await Enquirymodel.findOne({
      email,
      createdAt: { $gte: oneDayAgo }
    });

    if (existingEnquiry) {
      logger.warn('Duplicate enquiry attempt within 24 hours', { email });
      return res.status(409).json({
        success: false,
        message: 'You have already submitted an enquiry with this email. Please wait 24 hours before submitting again.'
      });
    }

    // Create new enquiry document
    const enquiry = new Enquirymodel({
      name,
      email,
      message,
      ipAddress: clientIp,
      status: 'pending'
    });

    // Save to database
    await enquiry.save();

    logger.info(`New enquiry created: ${enquiry._id}`, { email, name });

    // Send confirmation email to user (non-blocking)
    sendConfirmationEmail(enquiry).catch((error) => {
      logger.warn('Confirmation email failed', { email, error: error.message });
    });

    // Send admin notification (non-blocking)
    sendAdminNotificationEmail(enquiry).catch((error) => {
      logger.warn('Admin notification failed', { error: error.message });
    });

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Your enquiry has been received. We will get back to you soon.',
      data: {
        enquiryId: enquiry._id,
        email: enquiry.email,
        submittedAt: enquiry.createdAt
      }
    });
  } catch (error) {
    logger.error('Error creating enquiry', { error: error.message, stack: error.stack });

    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'This email has already been used.'
      });
    }

    // Generic error response
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your enquiry. Please try again later.'
    });
  }
};

/**
 * Get all enquiries (admin endpoint)
 * @route GET /api/contact
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getEnquiries = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || null;

    let query = {};
    if (status) {
      query.status = status;
    }

    const total = await Enquirymodel.countDocuments(query);
    const enquiries = await Enquirymodel.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    logger.info('Enquiries retrieved', { page, limit, total });

    res.status(200).json({
      success: true,
      data: enquiries,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Error retrieving enquiries', { error: error.message });
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving enquiries.'
    });
  }
};

/**
 * Get a single enquiry by ID
 * @route GET /api/contact/:id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getEnquiryById = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await Enquirymodel.findById(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    logger.debug('Enquiry retrieved', { id });

    res.status(200).json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    logger.error('Error retrieving enquiry', { error: error.message, id: req.params.id });
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving the enquiry.'
    });
  }
};

/**
 * Update enquiry status (admin endpoint)
 * @route PATCH /api/contact/:id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'read', 'resolved'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value. Must be pending, read, or resolved.'
      });
    }

    const enquiry = await Enquirymodel.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    logger.info(`Enquiry updated: ${id}`, { status });

    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully',
      data: enquiry
    });
  } catch (error) {
    logger.error('Error updating enquiry', { error: error.message, id: req.params.id });
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the enquiry.'
    });
  }
};

/**
 * Delete an enquiry
 * @route DELETE /api/contact/:id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await Enquirymodel.findByIdAndDelete(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    logger.info(`Enquiry deleted: ${id}`);

    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting enquiry', { error: error.message, id: req.params.id });
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the enquiry.'
    });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry
};
