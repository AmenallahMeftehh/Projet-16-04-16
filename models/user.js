//the User Model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* "passportLocalMongoose" a Mongoose plugin that simplifies building username
and password login with Passport */
var passportLocalMongoose = require('passport-local-mongoose');

//The User mongoose Schema
var User = new Schema({
    firstname : String,
    lastname : String,
    username : String,
    password : String,
    panier:[String]

});

// Passport Local Mongoose
User.plugin(passportLocalMongoose);

//exportis the User model
module.exports = mongoose.model('User', User);
