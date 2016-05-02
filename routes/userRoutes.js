var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.js');
//User Registration
 /**grab the values sent with the POST request (from the client-side) "req.body"
  *create a new User instance,and add it to the database
  *on this step a user is created and if we attempt ti add a user with the same "username we'll have the error "A user with the given username is already registered" */
router.post('/register', function(req, res) {
    User.register (new User({firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            username: req.body.username
                             }),
        req.body.password, function(err, account) {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({
                    status: 'Registration successful!'
                });
            });
        });
    });

//User Login
router.post('/login', function(req,res,next){
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        //logging in the user depending on its status
        req.logIn(user, function(err) {
            if(err){
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            res.status(200).json({
                status : 'Login Successful!!'
            });
        });
    })(req,res,next);//passport.authenticate method
});//router.post method

//Logging Out the user
router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'User Logged Out..Bye!!'
    });
});

//persist the user session after refresh
router.get('/status', function(req, res) {
    if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false
        });
    }
    res.status(200).json({
        status: true
    });
});


module.exports = router;
