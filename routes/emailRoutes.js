var express = require('express');
var nodemailer = require("nodemailer");
var app = express();
// var transporter = nodemailer.createTransport();
// sendgrid pour email
var sendgrid  = require('sendgrid')('amenallahmefteh','mefteh90');
// var User = require('../models/user');
var routes = function (Email) {
    var emailRouter = express.Router();

    emailRouter.get('/send/:contactEmail/:contactName/:contactSubject/:contactMsg',function(req,res){
        var mail = req.params.contactEmail;
        var sub= req.params.contactSubject;
        var msg = req.params.contactMsg;
        var name = req.params.contactName;
        sendgrid.send({
            to:       'amenallah.mefteh@esprit.tn',
            from:     'craftacademy@craftacademy.com',
            subject:  sub,
            text:     msg,
            name: name,
            email:mail
        }, function(err, json) {
            if (err) { return res.send("no mail"); }
            res.send("mail oki");
        });
        var mail = new Email({contactEmail:mail,contactSubject:sub,contactName:name,contactMsg:msg});
        mail.save();

    });
// reuperer tous les emails
    emailRouter.get('/', function (req, res) {
        var query = {};
        if (req.query.id) {
            query.id = req.query.id;
        }
        Email.find(query, function (err, users) {
            if (err)
                res.status(500).send(err);
            else
                res.json(users);
        });
    });


    return emailRouter;
};
module.exports = routes;
