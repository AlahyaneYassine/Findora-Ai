const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  
  password: {
    type: String,
    required: function () {
      // Requis uniquement si l'utilisateur ne vient pas de Google
      return !this.googleId;
    }
  },

  googleId: {
    type: String,
    default: null,
  },

  name: {
    type: String,
    default: '',
  },

  avatar: {
    type: String,
    default: '',
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

  isBlocked: {
    type: Boolean,
    default: false
  },

  resetPasswordToken: {
    type: String
  },

  resetPasswordExpires: {
    type: Date
  }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
