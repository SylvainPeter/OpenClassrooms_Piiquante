const express = require('express');
const router = express.Router();
// const ACTION = require('../controllers/user');

router.post('/signup', ACTION);
router.post('/login', ACTION);

module.exports = router;
