const express = require('express');
const router = express.Router();
const rationController = require('../controllers/rationController');

router.get('/', rationController.getUsers);
router.get('/addUsers', rationController.addUserPage);
router.post('/addUsers', rationController.addUser);
router.get('/goods', rationController.goodsPage);

module.exports = router;
