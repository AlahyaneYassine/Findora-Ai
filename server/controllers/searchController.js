const Search = require('../models/Search'); // Assure-toi d'importer ton modèle Search

const addSearch = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ msg: 'Recherche vide' });

    console.log('addSearch appelé avec query:', query);

    const newSearch = new Search({
      userId: req.user?.id || null,
      query,
    });

    await newSearch.save();

    console.log('Recherche enregistrée:', query);

    res.status(201).json({ msg: 'Recherche enregistrée' });
  } catch (err) {
    console.error('Erreur ajout recherche:', err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

module.exports = { addSearch };  // <-- export important !
