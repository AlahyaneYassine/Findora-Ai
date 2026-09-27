const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const purchaseController = require('../controllers/purchaseController');

// Créer un nouvel achat
router.post('/', authenticate, purchaseController.createPurchase);

// Récupérer les achats de l'utilisateur connecté
router.get('/my-purchases', authenticate, purchaseController.getMyPurchases);

module.exports = router;
