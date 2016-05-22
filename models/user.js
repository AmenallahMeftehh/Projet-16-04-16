//the User Model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var Produit  = mongoose.model('Produit', produitModel);

//"passportLocalMongoose" un plugin de Mongoose  qui simplifie la manipulation du login et mot de passe avec passport
var passportLocalMongoose = require('passport-local-mongoose');
//The User mongoose Schema
var User = new Schema({
    firstname: String
    , lastname: String
    , username: String
    , password: String
    , photo: String,

    statut: {
        type: Boolean
        , default: false
    }
    ,   panier:[{idproduit: {type: mongoose.Schema.Types.ObjectId, ref: 'Produit'},qt:{type:String},
        totalprixproduit:{type:Number}}]


    ,
        produitsAchetes:[
            {idproduit:{type:String},
            quantite:{type:Number},
                nom:{type:String},
              prix:{type:Number},
             image:{type:String},
             qt:{type:String},
             totalprixproduit:{type:Number},
            dateReservation:{type:Date,default:Date.now}}]


});
//
// Passport Local Mongoose
User.plugin(passportLocalMongoose);

//exportation the User model
module.exports = mongoose.model('User', User);
