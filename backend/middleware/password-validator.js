var passwordValidator = require('password-validator');

// Création du schéma
var passwordSchema = new passwordValidator();

// shéma 
passwordSchema
.is().min(4)                                    // 4 caractères minimum
.is().max(25)                                   // 25 caractères maximum
.has().uppercase(1)                             // minimum 1 majuscule
.has().lowercase(1)                             // minimum 1 minuscule
.has().digits(2)                                // minimum 2 chiffres
.has().not().spaces()                           // espaces interdits
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist de mot de passe

module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        return next();
    }else{
        return res.status(400).json({error: `mot de passe invalide ${passwordSchema.validate('req.body.password', { list: true })}` })
    }
}