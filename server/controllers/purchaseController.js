const mongoose = require('mongoose'); // tout en haut du fichier
const Purchase = require('../models/Purchase');

exports.createPurchase = async (req, res) => {
  try {
    const { product, supplier, quantity, price, purchaseDate } = req.body;

    if (!product || !price) {
      return res.status(400).json({ message: "Produit et prix requis" });
    }

    // 🔒 Validation supplémentaire
    if (isNaN(price)) {
      return res.status(400).json({ message: "Le prix est invalide" });
    }

    const newPurchase = new Purchase({
      user: new mongoose.Types.ObjectId(req.user.id), // ID utilisateur connecté
      product,
      supplier: supplier || null,
      purchaseDate: purchaseDate || Date.now(),
      quantity: quantity || 1,
      price: parseFloat(price)
    });

    console.log('📝 Données à enregistrer:', newPurchase);

    await newPurchase.save();

    res.status(201).json({ message: "Achat enregistré avec succès", purchase: newPurchase });
  } catch (error) {
    console.error("Erreur création achat:", error);
    res.status(500).json({ message: "Erreur serveur lors de l'ajout de l'achat" });
  }
};


exports.getMyPurchases = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('Recherche des achats pour userId:', userId);

    const purchases = await Purchase.find({ user: userId });
    console.log('Achats trouvés:', purchases);

    if (!purchases.length) {
      return res.status(200).json({ message: 'Aucun achat trouvé pour cet utilisateur.' });
    }

    res.status(200).json({ purchases });
  } catch (error) {
    console.error('Erreur récupération achats:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des achats' });
  }
};
