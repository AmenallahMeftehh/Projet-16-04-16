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
    , photo: {
        type: String
        , default: './public/images/non_logo.png'
    }
    , role: {
        type: String
        , default: "client"
    }
    , panier: [{
        idproduit: {
            type: mongoose.Schema.Types.ObjectId
            , ref: 'Produit'
        }
        , qt: {
            type: String
        }
        , totalprixproduit: {
            type: Number
        }
    }]



    
    , Commande: [
        {
            dateValidation: {
                type: Date
                , default: Date.now
            }
            , idproduit: {
                type: mongoose.Schema.Types.ObjectId
                , ref: 'Produit'
            }
            , qt: {
                type: String
            }
            , totalprixproduit: {
                type: Number
            }
        }
            ]


});
//
// Passport Local Mongoose
User.plugin(passportLocalMongoose);

//exportation the User model
module.exports = mongoose.model('User', User);