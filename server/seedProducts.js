// seedProducts.js
const mongoose = require('mongoose');
const path = require('path');

// Import du modèle Product en utilisant path.join pour éviter les erreurs de chemin
const Product = require(path.join(__dirname, 'models', 'Product'));

// Liste des produits à insérer dans la base
const products = [
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with adjustable DPI',
    price: 25.99,
    rating: 4.3,
    quantity: 150,
    supplier: 'TechSupply Co.',
    link: 'https://example.com/wireless-mouse',
    image: 'https://example.com/images/wireless-mouse.jpg',
    category: 'Electronics'
  },
  {
    name: 'Car Battery 12V',
    description: 'Long-lasting car battery for sedans and SUVs',
    price: 120.00,
    rating: 4.8,
    quantity: 40,
    supplier: 'AutoParts Ltd.',
    link: 'https://example.com/car-battery-12v',
    image: 'https://example.com/images/car-battery.jpg',
    category: 'Automotive'
  },
  {
    name: 'Office Chair',
    description: 'Comfortable ergonomic office chair with lumbar support',
    price: 89.99,
    rating: 4.1,
    quantity: 75,
    supplier: 'BureauStyle',
    link: 'https://example.com/office-chair',
    image: 'https://example.com/images/office-chair.jpg',
    category: 'Office Supplies'
  },
  {
    name: 'GPS Tracker',
    description: 'Real-time GPS tracking device for vehicles',
    price: 59.99,
    rating: 4.5,
    quantity: 100,
    supplier: 'TransportTech',
    link: 'https://example.com/gps-tracker',
    image: 'https://example.com/images/gps-tracker.jpg',
    category: 'Transport'
  }
];

// Fonction async pour connecter MongoDB, vider la collection, insérer les produits puis déconnecter
async function seed() {
  try {
    await mongoose.connect('mongodb://localhost:27017/authApp');
    console.log('Connected to MongoDB');

    // Supprimer tous les produits existants
    await Product.deleteMany({});
    console.log('Existing products deleted');

    // Insérer les produits exemples
    await Product.insertMany(products);
    console.log('Sample products inserted');

    // Déconnecter mongoose
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error during seeding:', err);
  }
}

// Lancer le seed
seed();
