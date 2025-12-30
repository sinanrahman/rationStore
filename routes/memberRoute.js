const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

router.get('/members/:rationNo', memberController.getMembers);
router.post('/add-member/:rationNo', memberController.addMember);

module.exports = router;
