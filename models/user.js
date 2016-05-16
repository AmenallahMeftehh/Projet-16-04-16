//the User Model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    , panier: [{idproduit:{type:String},qt:{type:Number}}]
    // panierValide:[[String]]

});

// Passport Local Mongoose
User.plugin(passportLocalMongoose);

//exportation the User model
module.exports = mongoose.model('User', User);
