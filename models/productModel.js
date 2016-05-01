var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var productModel = new Schema({
nom: {type:String},
image: {type:String},
prix:{type:Number},
quantite: {type:Number,default:1},
categorie:{type:String}
});

module.exports=mongoose.model('Product',productModel);
