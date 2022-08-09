const Sauce = require('../models/Sauce');
const fs = require('fs');


// RECUPERE TOUTES LES SAUCES
exports.getAllSauces = (req, res, next) => {
    Sauce.find().then( // cherche dans la BDD toutes les sauces
        (sauces) => {
            res.status(200).json(sauces); // renvoie la liste des sauces au format JSON
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};


// RECUPERE UNE SAUCE SPECIFIQUE
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ // cherche dans la BDD la Sauce ayant le même id que le paramètre de la requête
        _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce); // renvoie cette sauce au format JSON
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};


// CREE UNE NOUVELLE SAUCE
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce); // récupère toutes les infos du body
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({ // créé la nouvelle sauce
        ...sauceObject, // opérateur spread pour faire une copie rapide de tous les éléments de sauceObject
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // construit l'URL de l'image envoyée
    });

    sauce.save() // enregistre la sauce dans la BDD
        .then(() => { res.status(201).json({ message: 'Sauce enregistrée !' }) })
        .catch(error => { res.status(400).json({ error }) })
};


// MOFIDIE UNE SAUCE
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? { // vérifie si req.file existe ou non
        ...JSON.parse(req.body.sauce), // récupère les nouvelles infos du body
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // construit l'URL de l'image envoyée
    } : { ...req.body };
    delete sauceObject._userId;
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => { 
            if (sauce.userId != req.auth.userId) { // si l'utilisateur n'est pas autorisé
                res.status(401).json({ message: 'Not authorized' });
            } else { // si l'utilisateur est autorisé
                Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) // met à jour la sauce ayant le même _id que le paramètre de la requête
                    .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};


// SUPPRIME UNE SAUCE
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) // cherche dans la BDD la sauce ayant le même id que le paramètre de la requête
        .then(sauce => {
            if (sauce.userId != req.auth.userId) { // si l'utilisateur n'est pas autorisé
                res.status(401).json({ message: 'Not authorized' });
            } else { // si l'utilisateur est autorisé
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => { // supprime l'image du dossier image
                    Sauce.deleteOne({ _id: req.params.id }) // supprime la sauce de la BDD
                        .then(() => { res.status(200).json({ message: 'Sauce supprimée !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};


// LIKE OU DISLIKE UNE SAUCE
exports.likeSauce = (req, res, next) => {
    if (req.body.like === 1) { // si l'utilisateur like la sauce (1)
        Sauce.updateOne( // mise à jour de la sauce
            { _id: req.params.id },
            {
                $inc: { likes: 1 }, // incrémente le champ likes
                $push: { usersLiked: req.body.userId }, // ajoute l'id de cet utilisateur au tableau usersLiked
            }
        )
            .then(() => res.status(200).json({ message: "Like ajouté !" }))
            .catch((error) => res.status(400).json({ error }));
    }

    else if (req.body.like === -1) { // si l'utilisateur dislike la sauce (-1)
        Sauce.updateOne( // mise à jour de la sauce
            { _id: req.params.id },
            {
                $inc: { dislikes: 1 }, // incrémente le champ dislikes
                $push: { usersDisliked: req.body.userId }, // ajoute l'id de cet utilisateur au tableau usersDisliked
            }
        )
            .then(() => res.status(200).json({ message: "Dislike ajouté !" }))
            .catch((error) => res.status(400).json({ error }));
    }

    else if (req.body.like === 0) { // si l'utilisateur annule son like ou son dislike (0)
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                if (sauce.usersLiked.includes(req.body.userId)) { // si l'id de l'utilisateur est déjà présent dans usersLiked
                    Sauce.updateOne( // mise à jour de la sauce
                        { _id: req.params.id },
                        {
                            $pull: { usersLiked: req.body.userId }, // retire l'id de cet utilisateur du tableau usersLiked
                            $inc: { likes: -1 } // décrémente le champ likes
                        }
                    )
                        .then(() => {
                            res.status(200).json({ message: "Like supprimé !" });
                        })
                        .catch((error) => res.status(400).json({ error }));
                }
                else if (sauce.usersDisliked.includes(req.body.userId)) { // si l'id de l'utilisateur est déjà présent dans usersDisliked
                    Sauce.updateOne( // mise à jour de la sauce
                        { _id: req.params.id },
                        {
                            $pull: { usersDisliked: req.body.userId }, // retire l'id de cet utilisateur du tableau usersDisliked
                            $inc: { dislikes: -1 }, // décrémente le champ dislikes
                        }
                    )
                        .then(() => {
                            res.status(200).json({ message: "Dislike supprimé !" });
                        })
                        .catch((error) => res.status(400).json({ error }));
                }
            })
            .catch((error) => res.status(400).json({ error }));
    }
};
