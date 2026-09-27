const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: String,
  lastName: String,
  address: String,
  phone: String,
  bio: String,
  avatar: String,
  lastProfileUpdate: { type: Date }, // 👈 Ajout ici
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
