// declaration d'express
var express = require('express');
// declaration de mongoose pour se connecter a mongodb
var mongoose = require('mongoose');
// declaration de bodyParser pour lire body et le parser en jason object
var bodyParser = require('body-parser');
// declaration de passport pour l'authentification
var passport = require('passport');
var hash = require('bcrypt-nodejs');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;
// var sendgrid  = require('sendgrid')('amenallahmefteh','mefteh90');
var nodemailer = require("nodemailer");

// declaration de port
var port = process.env.PORT || 3000;
// connexion mongodb depuis le local
mongoose.connect('mongodb://localhost/bdchallenge');
// connexion mongodb depuis mongolab
// var urlmongolab = "mongodb://amenallahmefteh:mefteh@ds025762.mlab.com:25762/bdchallenge";
// mongoose.connect(urlmongolab);
// instantiation d'express
var app = express();
// var transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//         user: "meftah.amenallah@gmail.tn",
//         pass: "mefteh29"
//     }
// });
var http = require('http').Server(app);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
// initialisation et declaration de session pour utiliser passport
app.use(session({
    secret: 'secrhnfghhhdbdbdbgbgdbdet'
    , resave: true
    , saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


// declaration d'un model et route de produit
var Produit = require('./models/productModel');
produitRouter = require('./routes/productRoutes')(Produit);
app.use('/produits', produitRouter);
// declaration d'un model et route de user
var User = require('./models/user');
routes = require('./routes/userRoutes')(User);
app.use('/users', routes);
// declaration d'un model Email et le route'
var Email = require('./models/emailModel');
emailRouter = require('./routes/emailRoutes')(Email);
app.use('/email', emailRouter);

// pour le logging on a utiliser morgan
app.use(logger('dev'));
// body-parser pour parser en json

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(express.static(__dirname));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, function () {
    console.log("gulp is running Server on port " + port);
});
