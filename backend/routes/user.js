const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.FONCTION);
router.post('/login', userCtrl.FONCTION);

module.exports = router;
