const express = require('express');
const router = express.Router();
const dealController = require('../controllers/dealController');

router.get('/deals/:rationNo', dealController.dealPage);
router.get('/purchase/:rationNo', dealController.purchasePage);

module.exports = router;
