const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address'
      ]
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      minlength: [10, 'Message must be at least 10 characters long'],
      maxlength: [5000, 'Message cannot exceed 5000 characters']
    },
    status: {
      type: String,
      enum: ['pending', 'read', 'resolved'],
      default: 'pending'
    },
    ipAddress: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true,
    collection: 'enquiries'
  }
);

// Prevent duplicate email submission within 24 hours
enquirySchema.index({ email: 1, createdAt: 1 });

const Enquirymodel = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquirymodel;