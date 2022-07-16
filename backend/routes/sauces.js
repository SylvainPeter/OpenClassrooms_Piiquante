const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const saucesCtrl = require('../controllers/sauces');

router.get('/', auth, saucesCtrl.getAllSauces); // Affiche toutes les sauces
router.get('/:id', auth, saucesCtrl.getOneSauce); // Affiche juste une sauce
router.post('/', auth, multer, saucesCtrl.createSauce); // Poste une nouvelle sauce
router.put('/:id', auth, multer, saucesCtrl.modifySauce); // Modifie une sauce
router.delete('/:id', auth, saucesCtrl.deleteSauce); // Supprime une sauce

/*
router.post('/:id/like', auth, saucesCtrl.FONCTION); // Définit le statut like pour une sauce
*/
module.exports = router;
