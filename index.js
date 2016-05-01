// declaration d'express
var express = require('express');
// declaration de mongoose pour se connecter a mongodb
var mongoose = require('mongoose');
// declaration de bodyParser pour lire body et le parser en jason object
var  bodyParser = require('body-parser');
// declaration de port
var port = process.env.PORT || 3000;
// connexion a mongodb avec la Base de données bookAPI
mongoose.connect('mongodb://localhost/bdchallenge');
// instantiation d'express
var app = express();
// declaration de passport pour l'authentification
var passport = require('passport');
var hash = require('bcrypt-nodejs');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var localStrategy = require('passport-local' ).Strategy;

// declaration de model produit
var Product = require ('./models/productModel');
productRouter = require('./Routes/productRoutes')(Product);
app.use('/api/product', routes);

// pour le logging on a utiliser morgan
app.use(logger('dev'));
// body-parser pour parser en json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// initialisation et declaration de session pour utiliser passport
app.use(passport.initialize());
app.use(passport.session());
// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// routes


app.use(express.static(__dirname));
app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html');
});

app.listen(port, function(){
	console.log("gulp is running Server on port "+port);
});
