angular.module('app',['ngRoute', 'ui.bootstrap','ngMaterial']).config(['$routeProvider',function($routeProvider){
$routeProvider
.when('/login',{
  templateUrl:'public/pages/login.html',
  controller:'LoginCtrl'
})
.when('/register',{
  templateUrl:'public/pages/register.html',
  controller:'RegisterCtrl'
})
.when('/home',{
  templateUrl:'public/pages/home.html',
  controller:'homeController'

})
.when('/produits',{
  templateUrl:'public/pages/produits.html',
  controller:'produitController'

})
.when('/contact',{
  templateUrl:'public/pages/contact.html',
  

})
.when('/products',{
  templateUrl:'public/pages/products.html',
  controller:'produitController'

})
.when('/panier',{
  templateUrl:'public/pages/panier.html',
  controller:'DetailsProduitController'

})
.when('/football',{
  templateUrl:'public/pages/football.html',
  controller:'footballController'

})
.when('/golf',{
  templateUrl:'public/pages/golf.html',
  controller:'golfController'

})
.when('/cyclisme',{
  templateUrl:'public/pages/cyclisme.html',
  controller:'cyclismeController'

})
.when('/tennis',{
  templateUrl:'public/pages/tennis.html',
  controller:'tennisController'

})
.when('/details/:itemId', {
            templateUrl : 'public/pages/details/details.html',
            controller : 'DetailsProduitController'
        })


.otherwise({
    redirectTo: '/home'
          })

}]);
// affichage de popup pour se connecter a facebook
window.fbAsyncInit = function() {
    FB.init({
      appId      : '485968178269032',
      xfbml      : true,
      version    : 'v2.6'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
