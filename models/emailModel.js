var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var emailModel = new Schema({
    contactName: {
        type: String
    }
    , contactEmail: {
        type: String
    }
    , contactSubject: {
        type: String
    }
    , contactMsg: {
        type: String
    }
});
// var User  = mongoose.model('User',User);

//exportation du module Produit
module.exports = mongoose.model('Email', emailModel);