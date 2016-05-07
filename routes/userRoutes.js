var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user');
var Produit = require('../models/productModel');
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
          return res.redirect('/login');

        }
        //logging in the user depending on its status
        req.logIn(user, function(err) {
            if(err){
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            req.session.user=user;
            res.status(200).json({
                status : 'Login Successful!!',
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

router.get('/session',function(req,res){
  console.log(req.session.user);
if(!req.session.user){
  return res.status(404).send("no session");
}
return res.json(req.session.user);

})


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
// add product in panier
router.get('/:id/panier/:idproduct',function(req,res){
var idproduct= req.params.idproduct;
var iduser=req.params.id;
console.log("aaaaa");
User.update({_id:iduser},{$push:{panier:idproduct}},function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("sucess");
  }

});

})
router.get('/:id/',function(req,res){
user= req.body.user;
var iduser=req.params.id;
console.log("aaaaa");
User.find({_id:iduser},{},function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("sucess");
  }

});

})
// delete product from panier
router.delete('/:id/panier/:prodid',function(req, res){
  User.id=req.params.id;
  prodid=req.params.prodid;

  User.update({_id:User.id},{$pull:{panier:prodid}},function(err){
    if(err)
      res.status(500).send(err);
    else
    console.log("aaaa");
      res.status(204).send('Removed');
  });
});
// recuperer les produits d'un panier
router.get('/:id/panier',function(req, res){
  User.id=req.params.id;

  User.find({_id:User.id},{panier:[]},function(err){
    if(err)
      res.status(500).send(err);
    else
    console.log("aaaa");
      res.status(204).send('reup');
  });
});

//  Ajouter modifier supprimer un produit

router.post('/',function(req, res){
  var user = new User(req.body);
  user.save();
  res.status(201).send(user);
});

router.get('/:id',function(req, res){
      res.json(req.user);
  })
.put(function(req, res){
    User.id=req.params.id;

      User.findOneAndUpdate({_id:User.id}
        ,{

            $set: {
                firstname: req.body.firstname
                , lastname: req.body.lastname
                , photo: req.body.photo
                , username: req.body.username
                , statut :req.body.statut
                , panier:req.body.panier

        }

    },    function(err){
        if(err)
          res.status(500).send(err);
        else{
            res.json(req.user);
          }
      });
  })
  .delete(function(req, res){
    User.id=req.params.id;
    console.log(req.User);
    User.findOneAndRemove({_id:User.id},function(err){
      if(err)
        res.status(500).send(err);
      else
        res.status(204).send('Removed');
    });
  });

module.exports = router;
