const express = require('express');
const router = express.Router();
const rateLimit = require('../middleware/rate-limit');
const password = require('../middleware/password-validator');
const userCtrl = require('../controllers/user');

router.post('/signup', rateLimit, password, userCtrl.signup);
router.post('/login', rateLimit, password, userCtrl.login);

module.exports = router;
