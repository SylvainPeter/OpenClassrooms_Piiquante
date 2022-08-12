const express = require('express'); 
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const saucesRoutes = require('./routes/sauces')
const userRoutes = require('./routes/user');
const app = express();

require('dotenv').config(); // Variables d'environnement


// Connexion à la BDD
mongoose.connect(process.env.MONGODB_ACCESS,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Sécurise les headers HTTP
app.use(helmet());

// Autorise le CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Autorise le chargement d'images depuis la BDD
app.use(function (req, res, next) {
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site')
  next()
})


// Bodyparser
app.use(express.json());


// Routers
app.use('/api/sauces', saucesRoutes); // Routes pour les sauces
app.use('/api/auth', userRoutes); // Routes pour l'authentification
app.use('/images', express.static(path.join(__dirname, 'images'))); // Routes pour les images statiques


module.exports = app;
