var express = require('express');
var User = require('../models/user');
var routes = function (Produit) {
    var produitRouter = express.Router();
    produitRouter.route('/')
        .get(function (req, res) {
            var query = {};
            if (req.query.id) {
                query.id = req.query.id;
            }
            Produit.find(query, function (err, produits) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(produits);
            });
        });
    // recuperation par categorie
    produitRouter.get('/categorie/:categorie', function (req, res) {
        var categorie = req.params.categorie;
        Produit.find({
            "categorie": categorie
        }, function (err, produits) {
            if (err)
                res.status(500).send(err);
            else
                res.json(produits);
        });
    });

    // recuperation les produits a louer
    produitRouter.get('/location', function (req, res) {
        var location = req.params.location;
        Produit.find({
            "location": true
        }, function (err, locations) {
            if (err)
                res.status(500).send(err);
            else
                res.json(locations);
        });
    });




    //definir un middleware pour ne pas répéter

    produitRouter.use('/:produitId', function (req, res, next) {
        Produit.findById(req.params.produitId, function (err, produit) {

            if (err)
                res.status(500).send(err);
            else if (produit) {
                req.produit = produit;
                next();
            } else {
                res.status(404).send("no produit found");
            }
        });
    });
    produitRouter.route('/idUser/panier').get(function (req, res) {
        idUser = req.params.id;
        User.find({
            _id: idUser
        }, {
            panier
        }, function (data) {
            if (err)
                res.status(500).send(err);
            else
            res.status(204).send('recuper');
        });
    })


    //definir le product router pour recuperer un seul produit à partir de la liste des produits
    produitRouter.route('/:id', function (req, res) {
        res.json(req.produit);
    });

    // Ajouter modifier supprimer un produit
    produitRouter.route('/')
        .post(function (req, res) {
            var produit = new Produit(req.body);
            produit.save();
            res.status(201).send(produit);
        });

    produitRouter.route('/:id')
        .get(function (req, res) {
            res.json(req.produit);
        })
        .put(function (req, res) {
            Produit.id = req.params.id;

            Produit.findOneAndUpdate({
                    _id: Produit.id
                }
                , {

                    $set: {
                          nom: req.body.nom
                        , image: req.body.image
                        , prix: req.body.prix
                        , prixlocation: req.body.prixlocation
                        , quantite: req.body.quantite
                        , categorie: req.body.categorie
                        , location: req.body.location
                        , reservation: req.body.reservation

                    }

                }
                , function (err) {
                    if (err)
                        res.status(500).send(err);
                    else {
                        res.json(req.produit);
                    }
                });
        })
        .delete(function (req, res) {
            Produit.id = req.params.id;
            Produit.findOneAndRemove({
                _id: Produit.id
            }, function (err) {
                if (err)
                    res.status(500).send(err);
                else
                    res.status(204).send('Removed');
            });
        });



    // reservation
    // recuperer les reservations sur un produit
    produitRouter.get('/:id/reservation', function (req, res) {
        Produit.id = req.params.id;

        Produit.find({
            _id: Produit.id
        }, {
            reservation: Produit.id
        }, function (err, data) {
            if (err)
                res.status(500).send(err);
            else
                res.json(data);

        });
    });
    // ajouter une reservation sur un produit par un user dans le tableau des reservations
    produitRouter.post('/:idProduit/reservation/:username/date/:dateReservation', function (req, res) {
        var idProduit = req.params.idProduit;
        var username = req.params.username;
        var dateReservation=req.params.dateReservation;


        Produit.update({
            _id: idProduit
        }, {
            $push: {
                reservation: {
                    idProduit: idProduit
                    , username: username
                    , dateReservation: dateReservation
                }
            }
        }, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
            }

        });

    })



    return produitRouter;
};
module.exports = routes;
