const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// FONCTIONS

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // hashe le mot de passe récupéré dans le body (avec 10 cycles de salage)
      .then(hash => { // on récupère le hash
        const user = new User({ // on créé un nouvel User
          email: req.body.email,
          password: hash // le mot de passe crypté
        });
        user.save() // on sauvegarde le nouvel User dans la BDD
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };


  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password) // Compare le mot de passe entré avec le hash stocké dans la BDD
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign( // Chiffre un nouveau token
                            { userId: user._id },
                            process.env.RANDOM_TOKEN_SECRET, // chaîne secrète
                            { expiresIn: '24h' } // définit la durée de validité du token à 24 heures
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
  };
