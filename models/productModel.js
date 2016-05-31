var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema du produit
var produitModel = new Schema({
    nom: {
        type: String
    }
    , image: {
        type: String
    }
    , prix: {
        type: Number
    }
    , prixlocation: {
        type: Number
    }
    , quantite: {
        type: Number
    }
    , categorie: {
        type: String
    }
    , location: {
        type: Boolean
        , default: false
    }
    , reservation: [{
        username: {
            type: String
        }
        , idProduit: {
            type: String
        }
        , dateReservation: {
            type: Date
        }
    }]
});
// var User  = mongoose.model('User',User);

//exportation du module Produit
module.exports = mongoose.model('Produit', produitModel);