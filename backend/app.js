const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// const sauceRoutes = require('./routes/sauce');
// const userRoutes = require('./routes/user');

const app = express();

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

app.use('/images', express.static(path.join(__dirname, 'images'))); // Routes pour les images statiques



app.use((req, res) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
});

// app.use('/api/sauces', sauceRoutes); // Router de base
// app.use('/api/auth', userRoutes); // Routes pour l'authentification


module.exports = app;
