const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const saucesCtrl = require('../controllers/sauces');

/*
router.get('/', auth, saucesCtrl.FONCTION); // Affiche toutes les sauces
router.get('/:id', auth, saucesCtrl.FONCTION); // Affiche juste une sauce
router.post('/', auth, multer, saucesCtrl.FONCTION); // Poste une nouvelle sauce
router.post('/:id/like', auth, saucesCtrl.FONCTION); // Définit le statut like pour une sauce
router.put('/:id', auth, multer, saucesCtrl.FONCTION); // Modifie une sauce
router.delete('/:id', auth, saucesCtrl.FONCTION); // Supprime une sauce
*/
module.exports = router;

