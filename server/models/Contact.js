// models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  isRead: {
    type: Boolean,
    default: false
  },
  reply: {
    type: String,
    default: ''
  },
  repliedAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);
