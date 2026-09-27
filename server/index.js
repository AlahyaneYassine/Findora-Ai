require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const profileRoutes = require('./routes/ProfileRoutes'); 
const productSearchRoutes = require('./routes/productSearchRoutes');
const selectionRoutes = require('./routes/selections');
const adminRoutes = require('./routes/adminRoutes');
const searchRoutes = require('./routes/searchRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const replyRoutes = require('./routes/replyRoutes');
const app = express();

// === Middleware ===
app.use(cors({
  origin: 'http://localhost:3000', // ✅ Autorise React local
  credentials: true
}));
app.use(express.json());

// === Serveur d’images uploadées ===
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// === Routes API ===
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/ai-search', productSearchRoutes);
app.use('/api/selections', selectionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/purchases', purchaseRoutes); // ✅ NE PAS dupliquer
app.use('/api/reply', replyRoutes); // ✅ Route pour les réponses aux messages
// === Fallback 404 ===
app.use((req, res) => {
  res.status(404).json({ msg: 'Endpoint not found' });
});

// === Connexion MongoDB ===
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/authApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
