const Sauce = require('../models/Sauces');
const fs = require('fs');

// FONCTIONS


/*
// Fonction qui récupère tous les objets
exports.getAllStuff = (req, res, next) => {
    Thing.find().then( // renvoie un tableau contenant tous les Things dans la BDD
        (things) => {
            res.status(200).json(things);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

// Fonction qui récupère un objet spécifique
exports.getOneThing = (req, res, next) => {
    Thing.findOne({ // trouve le Thing unique ayant le même _id que le paramètre de la requête
        _id: req.params.id
    }).then(
        (thing) => {
            res.status(200).json(thing);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

// Fonction qui poste un objet
exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    delete thingObject._userId;
    const thing = new Thing({
        ...thingObject, // L'opérateur spread fait une copie de tous les éléments
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // reconstruit l'URL complète du fichier enregistré
    });

    thing.save() // enregistre le Thing dans la BDD
        .then(() => { res.status(201).json({ message: 'Objet enregistré !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

// Fonction qui modifie un objet
exports.modifyThing = (req, res, next) => {
    const thingObject = req.file ? { // objet thingObject qui regarde si req.file existe ou non
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete thingObject._userId;
    Thing.findOne({ _id: req.params.id })
        .then((thing) => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id }) // met à jour le Thing ayant le même _id que le paramètre de la requête
                    .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// Fonction qui supprime un objet
exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                const filename = thing.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Thing.deleteOne({ _id: req.params.id }) // supprime le Thing ayant le même _id que le paramètre de la requête
                        .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};
*/
