const express = require('express');
const router = express.Router();
const { searchAIProducts } = require('../controllers/productSearchController');

router.get('/:category', searchAIProducts);
module.exports = router;