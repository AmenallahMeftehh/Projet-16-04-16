var express = require('express');
var nodemailer = require("nodemailer");
var app = express();
var transporter = nodemailer.createTransport();
// var User = require('../models/user');
var routes = function (Email) {
    var emailRouter = express.Router();




    emailRouter.get('/send',function(req,res){

            var mailData = {
                from: 'sender@server.com',
                to: 'meftah.amenallah@gmail.com',
                subject: 'Message title',
                text: 'Plaintext version of the message'
            };

        console.log(mailData);
        transporter.sendMail(mailData, function(error, response){
            if(error){
                console.log(error);
                res.end("error");
            }else{
                console.log("Message sent: " + response.message);
                res.end("sent");
            }
        });
    });

    return emailRouter;
};
module.exports = routes;