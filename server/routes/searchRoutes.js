const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { searchAIProducts } = require('../controllers/productSearchController');

router.get('/:category', authenticate, searchAIProducts);

module.exports = router;
