const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.loginPage);
router.post('/loginpage', authController.login);

module.exports = router;
