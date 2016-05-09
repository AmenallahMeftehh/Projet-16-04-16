var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var produitModel = new Schema({
nom: {type:String},
image: {type:String},
prix:{type:Number},
prixlocation:{type:Number},
quantite: {type:Number},
categorie:{type:String},
location: { type:Boolean , default:false}
});

module.exports=mongoose.model('Produit',produitModel);
