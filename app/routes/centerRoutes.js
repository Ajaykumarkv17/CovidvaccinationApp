const express = require('express');
const router = express.Router();
const centerController = require('../controllers/centerController');

// Handle center search
router.get('/search', centerController.renderSearchForm);
router.post('/search', centerController.searchCenters);

// Handle center selection
router.get('/:centerId', centerController.selectCenter);

module.exports = router;
