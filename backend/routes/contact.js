/**
 * Contact Routes
 * All endpoints related to contact/enquiry management
 */

const express = require('express');
const router = express.Router();
const { validateContactForm } = require('../middleware/validators');
const {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry
} = require('../controllers/contactController');

/**
 * POST /api/contact
 * Create a new enquiry (public endpoint)
 * Requires validation middleware
 */
router.post('/', validateContactForm, createEnquiry);

/**
 * GET /api/contact
 * Get all enquiries (admin endpoint)
 */
router.get('/', getEnquiries);

/**
 * GET /api/contact/:id
 * Get a specific enquiry by ID
 */
router.get('/:id', getEnquiryById);

/**
 * PATCH /api/contact/:id
 * Update enquiry status
 */
router.patch('/:id', updateEnquiry);

/**
 * DELETE /api/contact/:id
 * Delete an enquiry
 */
router.delete('/:id', deleteEnquiry);

module.exports = router;
