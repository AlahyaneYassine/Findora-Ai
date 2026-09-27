const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: String,
    required: true
  },
  supplier: String,
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  quantity: {
    type: Number,
    default: 1
  },
  price: Number

}, 

{ timestamps: true });

module.exports = mongoose.model('Purchase', purchaseSchema);
