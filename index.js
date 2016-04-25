var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('localhost/bdchallenge', ['bdchallenge']);
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');
//require('./models/Cyclisme');
//require('./models/produitsCyc');
//mongoose.connect('mongodb://localhost/bdchallenge');

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());

// methode get de http pour recuperer la liste des voitures

app.get('/bdchallenge', function (req, res) {
    console.log('I received a GET request');

    db.bdchallenge.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
});
// methode post de http pour ajouter une voiture dans la liste des voitures

app.post('/bdchallenge', function (req, res) {
    console.log(req.body);

    db.bdchallenge.insert(req.body
        , function (err, doc) {
            res.json(doc);
            
        });
});
//methode delete de http pour supprimer une voiture de la liste des voitures
app.delete('/bdchallenge/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.bdchallenge.remove({
            _id: mongojs.ObjectId(id)
        }
        , function (err, doc) {
            res.json(doc);
        });
});

app.get('/bdchallenge/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.bdchallenge.findOne({
            _id: mongojs.ObjectId(id)
        }
        , function (err, doc) {
            res.json(doc);
        });
});
//app.put('/bdchallenge/:id', function (req, res) {
//    var id = req.params.id;
//    console.log(req.body.nom);
//    db.listvoiture.findAndModify({
//        query: {
//            _id: mongojs.ObjectId(id)
//        }
//        , update: {
//            $set: {
//                nom: req.body.nom
//                , couleur: req.body.couleur
//                , type: req.body.type
//                , prix: req.body.prix
//            }
//        }
//        , new: true
//    }, function (err, doc) {
//        res.json(doc);
//    });
//});

app.listen(3000);
console.log("Server running on port 3000");