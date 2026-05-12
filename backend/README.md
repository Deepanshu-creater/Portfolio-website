# Portfolio Backend Setup Guide

## Overview
This is a production-ready Node.js/Express backend for a portfolio website with contact form handling and EmailJS integration.

## Features
- ✅ Express.js API with proper routing structure
- ✅ MongoDB integration with Mongoose
- ✅ EmailJS email service integration
- ✅ Input validation and error handling
- ✅ CORS configuration for security
- ✅ Environment variable management
- ✅ Comprehensive logging system
- ✅ Duplicate submission prevention (24-hour rate limiting)
- ✅ Anti-spam measures
- ✅ Production-ready error handling

## Prerequisites
- Node.js 14+ installed
- MongoDB running locally or MongoDB Atlas connection string
- EmailJS account with Service ID, Template ID, and Public Key

## Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Create a `.env` file in the `backend` directory:

```bash
# Database Configuration
DBURL=mongodb://127.0.0.1:27017/portfolio
NODE_ENV=development

# Server Configuration
PORT=8000

# EmailJS Configuration
EMAILJS_SERVICE_ID=service_your_id
EMAILJS_TEMPLATE_ID=template_your_id
EMAILJS_PUBLIC_KEY=your_public_key

# CORS Configuration
FRONTEND_URL=http://localhost:5173
VERCEL_URL=https://your-vercel-url.vercel.app

# Logging
LOG_LEVEL=debug
```

**For production:**
```bash
NODE_ENV=production
LOG_LEVEL=info
```

### 3. Configure EmailJS

1. Sign up at [EmailJS.com](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your:
   - Service ID
   - Template ID
   - Public Key
5. Add them to your `.env` file

## Running the Server

### Development
```bash
npm run dev
```
The server will restart automatically on file changes.

### Production
```bash
npm start
```

## API Endpoints

### POST /api/contact
Create a new enquiry (contact form submission)

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'm interested in your services"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Your enquiry has been received. We will get back to you soon.",
  "data": {
    "enquiryId": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "submittedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (409 - Duplicate):**
```json
{
  "success": false,
  "message": "You have already submitted an enquiry with this email. Please wait 24 hours before submitting again."
}
```

### GET /api/contact
Get all enquiries (admin endpoint)

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)
- `status` (pending, read, resolved)

### GET /api/contact/:id
Get a specific enquiry by ID

### PATCH /api/contact/:id
Update enquiry status

**Request:**
```json
{
  "status": "read"
}
```

### DELETE /api/contact/:id
Delete an enquiry

## Validation Rules

### Name
- Required
- Length: 2-100 characters

### Email
- Required
- Valid email format
- Unique per 24 hours (anti-spam)

### Message
- Required
- Length: 10-5000 characters

## Database Schema

### Enquiry Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  message: String,
  status: String ('pending' | 'read' | 'resolved'),
  ipAddress: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Logging

### Log Files
- `logs/error.log` - Error messages
- `logs/warn.log` - Warnings
- `logs/info.log` - Info messages
- `logs/debug.log` - Debug details

### Log Levels
- **production**: info level (errors and important info only)
- **development**: debug level (all messages)

## Error Handling

The backend includes comprehensive error handling:

1. **Validation Errors** (400)
   - Missing required fields
   - Invalid email format
   - Message length violations

2. **Duplicate Errors** (409)
   - Same email submitted within 24 hours
   - Email already in database

3. **Server Errors** (500)
   - Database connection issues
   - EmailJS API failures
   - Unexpected errors

## CORS Configuration

The backend accepts requests from:
- `http://localhost:5173` (local development)
- `http://localhost:3000` (alternative local)
- `https://portfolio-website-psi-murex-97.vercel.app` (production)

## Frontend Integration

### API Configuration
The frontend should use environment variables:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || '/api/contact';
```

### Frontend .env
```
VITE_API_BASE_URL=https://portfolio-website-wk4v.onrender.com
VITE_API_ENDPOINT=/api/contact
VITE_EMAILJS_SERVICE_ID=service_your_id
VITE_EMAILJS_TEMPLATE_ID=template_your_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Testing

### Test Submission
```bash
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message with at least 10 characters"
  }'
```

### Health Check
```bash
curl http://localhost:8000/health
```

## Troubleshooting

### Issue: MongoDB connection failed
- Check if MongoDB is running: `mongod`
- Verify DBURL in `.env`
- Check MongoDB credentials if using Atlas

### Issue: EmailJS not sending emails
- Verify credentials in `.env`
- Check EmailJS account and templates
- Review logs for API errors

### Issue: CORS errors
- Add your frontend URL to corsOptions in index.js
- Check FRONTEND_URL in .env

### Issue: Duplicate email error when first time submitting
- Check if MongoDB unique index exists
- Try: `db.enquiries.dropIndex("email_1")`
- Restart server

## Production Deployment

### Vercel
1. Add environment variables to Vercel dashboard
2. Deploy: `git push`
3. Update frontend VITE_API_BASE_URL to your Vercel backend URL

### Manual Server
1. Copy files to server
2. Install dependencies: `npm install`
3. Set production environment variables
4. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start index.js
   pm2 save
   ```

## Security Considerations

- ✅ Input validation on all endpoints
- ✅ Rate limiting (24-hour duplicate prevention)
- ✅ Sensitive credentials in environment variables
- ✅ CORS properly configured
- ✅ Error messages don't leak sensitive info in production
- ✅ MongoDB injection prevention via Mongoose

## Performance Optimization

- ✅ Database indexing on email field
- ✅ Pagination support for GET /api/contact
- ✅ Timeout configuration for external APIs
- ✅ Async error handling

## Support

For issues or questions, check:
1. Logs in `logs/` directory
2. Browser console for frontend errors
3. MongoDB Atlas dashboard for database issues
4. EmailJS dashboard for email service issues
