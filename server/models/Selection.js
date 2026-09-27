const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: String,
  supplier: String,
  image_url: String,
  product_url: String,
  rating: Number, // <-- Ajout du champ rating
});

const selectionSchema = new mongoose.Schema({
  user: { // 🔁 renommé ici
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [productSchema],
}, { timestamps: true });

module.exports = mongoose.model('Selection', selectionSchema);
