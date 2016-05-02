var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var produitModel = new Schema({
nom: {type:String},
image: {type:String},
prix:{type:Number},
quantite: {type:Number},
categorie:{type:String}
});

module.exports=mongoose.model('Produit',produitModel);
