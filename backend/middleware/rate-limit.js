const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // Limite chaque IP à 10 requêtes par "fenêtre" (ici, par 15 minutes)
	message: "Trop de tentatives de connexion depuis cette adresse IP, veuillez réessayer dans 15 minutes", //
	standardHeaders: true,
	legacyHeaders: false,
})

module.exports = limiter;
