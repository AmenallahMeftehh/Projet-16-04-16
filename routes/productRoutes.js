var express = require ('express');
var User = require('../models/user');
var routes = function(Produit){
  var produitRouter = express.Router();
  produitRouter.route('/').get(function(req, res){
      var query = {};
      if(req.query.id){
        query.id = req.query.id;
      }
      Produit.find(query, function(err, produits){
        if(err)
          res.status(500).send(err);
        else
          res.json(produits);
      });
    });
// recuperation par categorie
produitRouter.get('/categorie/:categorie',function(req, res){
  var categorie = req.params.categorie;
console.log("aaaaa");
    Produit.find({"categorie":categorie}, function(err, produits){
      if(err)
        res.status(500).send(err);
      else
        res.json(produits);
    });
  });




  //definir un middleware pour ne pas répéter

  produitRouter.use('/:produitId', function(req,res,next){
      Produit.findById(req.params.produitId, function(err,produit){
        console.log(req.params.produitId);

        if(err)
          res.status(500).send(err);
        else if(produit)
        {
          req.produit = produit;
          console.log(req.produit);
          next();
        }
        else
        {
          res.status(404).send("no produit found");
        }
      });
  });
produitRouter.get('/idUser/panier',function(req,res){
idUser= req.params.id;
User.find({_id:idUser},{panier},function(data){
  if(err)
    res.status(500).send(err);
  else
  console.log("aaaa");
    res.status(204).send('recuper');
  });
})


  //definir le product router pour recuperer un seul produit à partir de la liste des produits
  produitRouter.get('/:id',function(req, res){
        res.json(req.produit);
    });
    return produitRouter;
};
module.exports = routes;
