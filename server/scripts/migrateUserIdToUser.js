const mongoose = require('mongoose');
require('dotenv').config(); // Pour charger MONGO_URI si tu l'utilises

const Selection = require('../models/Selection');

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ton-nom-de-bdd');

    const results = await Selection.updateMany(
      { userId: { $exists: true }, user: { $exists: false } },
      [
        { $set: { user: "$userId" } },
        { $unset: "userId" }
      ]
    );

    console.log(`✅ Migration terminée : ${results.modifiedCount} documents mis à jour.`);
  } catch (err) {
    console.error('❌ Erreur pendant la migration :', err);
  } finally {
    await mongoose.disconnect();
  }
};

migrate();
