const express = require('express');
const app = express();

const mongoose = require('mongoose');
const path = require('path');

const sauceRoutes = require('./routes/sauces')
const userRoutes = require('./routes/user');

// Variables d'environnement
require('dotenv').config();

// Connexion à la BDD
mongoose.connect(process.env.MONGODB_ACCESS,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Bodyparser
app.use(express.json());

// Autorise le CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Routers
app.use('/api/sauces', sauceRoutes); // Routes pour les sauces
app.use('/api/auth', userRoutes); // Routes pour l'authentification
app.use('/images', express.static(path.join(__dirname, 'images'))); // Routes pour les images statiques

module.exports = app;
