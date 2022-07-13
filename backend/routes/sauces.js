const express = require('express');
const router = express.Router();
// const ACTION = require('../controllers/sauces');

router.get('/', ACTION); // Toutes les sauces
router.get('/:id', ACTION); // Une sauce
router.post('/', ACTION); // Poste une sauce
router.post('/:id/like', ACTION); // Définit le statut like pour une sauce
router.put('/:id', ACTION); // Modifie une sauce
router.delete('/:id', ACTION); // Supprime une sauce

module.exports = router;

