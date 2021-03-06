var express = require('express');
var session = require('express-session');
var passport = require('passport');

var User = require('../models/user');
var Produit = require('../models/productModel');
// sendgrid pour email
var sendgrid  = require('sendgrid')('amenallahmefteh','mefteh90');

//User Registration

var routes = function (User) {
    var router = express.Router();
    router.post('/register', function (req, res) {
        User.register(new User({
                firstname: req.body.firstname
                , lastname: req.body.lastname
                , username: req.body.username
                , photo: req.body.photo
                , statut: req.body.statut
            })
            , req.body.password
            , function (err, account) {
                if (err) {
                    return res.status(500).json({
                        err: err
                    });
                }
                passport.authenticate('local')(req, res, function () {
                    return res.status(200).json({
                        status: 'Registration successful!'
                    });
                });
            });
    });

    //User Login
    router.post('/login', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/login');

            }
            //logging in the user depending on its status
            req.logIn(user, function (err) {
                if (err) {
                    return res.status(500).json({
                        err: 'Could not log in user'
                    });
                }
                req.session.user = user;
                res.status(200).json({
                    status: 'Login successful!',
                    user: user //retourne les infos de l'utilisateur
                 });
            });
        })(req, res, next); //passport.authenticate method
    }); //router.post method

    //Logging Out the user
    router.get('/logout', function (req, res) {
        req.logout();
        req.session.user = null;
        res.status(200).json({
            status: 'Bye!'
        });
    });

    router.get('/session', function (req, res) {
        if (!req.session.user) {
            return res.status(404).send("no session");
        }
        return res.json(req.session.user);

    })
    //definir un middleware pour ne pas répéter

    router.use('/:id', function (req, res, next) {
        User.findById(req.params.id, function (err, user) {

            if (err)
                res.status(500).send(err);
            else if (user) {
                req.user = user;
                next();
            } else {
                res.status(404).send("no user found");
            }
        });
    });


    // recuperer un utilisateur
        router.get('/:id', function (req, res) {
            User.id = req.params.id
            User.find({
                _id: User.id
            }, function (err, data) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(data);
                }

            });
        });
    //persist the user session after refresh
    router.get('/status', function (req, res) {
        if (!req.isAuthenticated()) {
            return res.status(200).json({
                status: false
            });
        }
        res.status(200).json({
            status: true
        });
    });
    // add product in panier
    router.get('/:iduser/panier/:id/:qt/:prix', function (req, res) {

            var iduser = req.params.iduser;
             var id=req.params.id;

             var qt = req.params.qt;
             var prix= req.params.prix;
            var totalprixproduit= prix*qt;

           User.update({
               _id: iduser
           }, {
               $push: {
                   panier:{idproduit:id,qt:qt,totalprixproduit:totalprixproduit}
               }
           }, function (err) {
               if (err) {
                   console.log(err);
               } else {
                   res.status(200).json({
                       status: true
                   });
               }
            });
        })


// reserver un panier
        router.get('/:id/panierreserve/:idproduit/:qt/:totalprixproduit', function (req, res) {
                var idproduit = req.params.idproduit;
                var qt = req.params.qt;
                var iduser = req.params.id;
                var totalprixproduit = req.params.totalprixproduit;
                User.update({
                    _id: iduser
                },{
                    $push: { Commande : {idproduit:idproduit,qt:qt,totalprixproduit:totalprixproduit}

                    }
                }, function (err) {
                    if (err) {
                    } else {
                        res.status(200).json({
                            status: true
                        });
                    }

                });


            })




    // delete product from panier
    router.delete('/:id/panier/:prodid', function (req, res) {
        User.id = req.params.id;
        prodid = req.params.prodid;
        User.update({
            _id: User.id
        }, {
            $pull: {
                panier: {_id: prodid}
            }
        }, function (err) {
            if (err)
                res.status(500).send(err);
            else
            res.status(204).send('Removed');
        });
    });
// vider le panier
    router.delete('/:id/panier', function (req, res) {
        User.id = req.params.id;

        User.update({
            _id: User.id
        }, {
            $set: {
                panier: []
            }
        }, function (err) {
            if (err)
                res.status(500).send(err);
            else
            res.status(204).send('panier validé ');
        });
    });



    // recuperer les produits d'un panier
    router.get('/:id/panier', function (req, res) {
        id = req.params.id;
        User.find({
            _id: id
        }, function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(data);
            }

        }).populate('panier.idproduit').exec(function(error, produits) {
            console.log(JSON.stringify(produits, null, "\t"))
        });


    });


    // recuper les produits de la commande d'un utilisateur'
    router.get('/:id/commande', function (req, res) {
        id = req.params.id;
        User.find({
            _id: id
        }, function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(data);
            }

        }).populate('Commande.idproduit').exec(function(error, commandes) {
            console.log(JSON.stringify(commandes, null, "\t"))
        });


    });

    //  Ajouter modifier supprimer un utilisateur
    // recuperer tous les utilisateurs
    router.get('/', function (req, res) {
        var query = {};
        if (req.query.id) {
            query.id = req.query.id;
        }
        User.find(query, function (err, users) {
            if (err)
                res.status(500).send(err);
            else
                res.json(users);
        });
    });

    // ajouter un utilisateur
    router.route('/').post(function (req, res) {
        var user = new User(req.body);
        user.save();
        res.status(201).send(user);
    });
    //definir le product router pour recuperer un seul produit à partir de la liste des produits
    router.route('/:id')
        .get(function (req, res) {
            res.json(req.user);
        })
        // modifier un utilisateur
        .put(function (req, res) {
            User.id = req.params.id;

            User.findOneAndUpdate({
                    _id: User.id
                }
                , {

                    $set: {
                        firstname: req.body.firstname
                        , lastname: req.body.lastname
                        , username: req.body.username
                        , password: req.body.password
                        , photo: req.body.photo
                        , role: req.body.role
                        , panier: req.body.panier
                        , Commande: req.body.Commande

                    }

                }
                , function (err) {
                    if (err)
                        res.status(500).send(err);
                    else {
                        res.json(req.user);
                    }
                });
        })
        // supprimer un utilisateur
        .delete(function (req, res) {
            User.id = req.params.id;
            User.findOneAndRemove({
                _id: User.id
            }, function (err) {
                if (err)
                    res.status(500).send(err);
                else
                    res.status(204).send('Removed');
            });
        });

    return router;
};
module.exports = routes;
