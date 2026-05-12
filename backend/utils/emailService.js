/**
 * EmailJS Service
 * Sends emails using the EmailJS API
 */

const axios = require('axios');
const logger = require('./logger');

// EmailJS API endpoint
const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send';

/**
 * Send email via EmailJS
 * @param {Object} params - Email parameters
 * @returns {Promise<Object>} - Response from EmailJS
 */
const sendEmailNotification = async (params) => {
  try {
    // Validate required environment variables
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

   if (!serviceId || !templateId || !publicKey || !privateKey) {
      throw new Error(
        'EmailJS configuration incomplete. Please set EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, and EMAILJS_PUBLIC_KEY in environment variables.'
      );
    }

    const emailPayload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey, 
      template_params: {
        to_email: params.email,
        from_name: 'Portfolio Contact',
        user_name: params.name,
        user_email: params.email,
        message: params.message,
        reply_to: params.email,
        timestamp: new Date().toISOString()
      }
    };

    logger.debug('Sending email via EmailJS', {
      to: params.email,
      service: serviceId,
      template: templateId
    });

    const response = await axios.post(EMAILJS_API_URL, emailPayload, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 seconds timeout
    });

    logger.info(`Email sent successfully to ${params.email}`, {
      status: response.status
    });

    return {
      success: true,
      message: 'Email sent successfully',
      messageId: response.data?.result?.status || 'unknown'
    };
  } catch (error) {
    logger.error('EmailJS error', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    throw {
      success: false,
      message: 'Failed to send email notification',
      error: error.message
    };
  }
};

/**
 * Send confirmation email to user
 * @param {Object} enquiry - Enquiry data
 * @returns {Promise<Object>} - Response
 */
const sendConfirmationEmail = async (enquiry) => {
  return sendEmailNotification({
    email: enquiry.email,
    name: enquiry.name,
    message: `Thank you ${enquiry.name} for reaching out! We've received your message and will get back to you soon.`
  });
};

/**
 * Send admin notification email
 * @param {Object} enquiry - Enquiry data
 * @returns {Promise<Object>} - Response
 */
const sendAdminNotificationEmail = async (enquiry) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
    return sendEmailNotification({
      email: adminEmail,
      name: 'Admin',
      message: `New enquiry from ${enquiry.name} (${enquiry.email}): ${enquiry.message}`
    });
  } catch (error) {
    logger.warn('Admin notification email failed', { error: error.message });
    // Don't throw - admin email is non-critical
    return { success: false, message: 'Admin notification skipped' };
  }
};

module.exports = {
  sendEmailNotification,
  sendConfirmationEmail,
  sendAdminNotificationEmail
};
