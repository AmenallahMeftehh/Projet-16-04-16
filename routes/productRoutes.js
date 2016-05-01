var express = require ('express');

var routes = function(Product){
  var productRouter = express.Router();
  productRouter.route('/').get(function(req, res){
      var query = {};
      if(req.query.id){
        query.id = req.query.id;
      }
      Product.find(query, function(err, products){
        if(err)
          res.status(500).send(err);
        else
          res.json(products);
      });
    });
  //definir un middleware pour ne pas répéter

  productRouter.use('/:productId', function(req,res,next){
      Book.findById(req.params.productId, function(err,book){
        console.log(req.params.productId);

        if(err)
          res.status(500).send(err);
        else if(product)
        {
          req.product = product;
          console.log(req.product);
          next();
        }
        else
        {
          res.status(404).send("no book found");
        }
      });
  });

  //definir le product router pour recuperer un seul produit à partir de la liste des produits
  productRouter.route('/:id')
    .get(function(req, res){
        res.json(req.product);
    });
    return productRouter;
};
module.exports = routes;
