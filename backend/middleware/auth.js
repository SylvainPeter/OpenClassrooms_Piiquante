const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Récupère le token du header Authorization (en enlevant le mot "Bearer")
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Vérifie le token
        const userId = decodedToken.userId; // extrait l'ID utilisateur du token et le rajoute à l’objet Request
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(403).json({ error: '403 : unauthorized request' });
        // res.status(403).json({ error: error | '403 : unauthorized request' });
    }
};