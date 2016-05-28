angular.module('app', ['chart.js','ngRoute','ui.bootstrap', 'ngMaterial', 'ngMessages']).config(['$routeProvider', '$mdThemingProvider', function ($routeProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('blue');

    $routeProvider.when('/login', {
            templateUrl: 'public/pages/login.html'
            , controller: 'LoginCtrl'
            ,  access: {restricted: false},
                admin: {restricted: false}
        })
        .when('/register', {
            templateUrl: 'public/pages/register.html'
            , controller: 'RegisterCtrl'
            ,  access: {restricted: false},
                admin: {restricted: false}
        })
        .when('/home', {
            templateUrl: 'public/pages/home.html'
            , controller: 'emailController'
            ,  access: {restricted: false},
                admin: {restricted: false}

        })
        .when('/reservations/:itemId', {
            templateUrl: 'public/pages/reservations.html'
            , controller: 'DetailsProduitController'
            ,  access: {restricted: true},
                admin: {restricted: true}

        })
        .when('/produits', {
            templateUrl: 'public/pages/produits.html'
            , controller: 'produitController'
            ,  access: {restricted: false},
                admin: {restricted: false}

        })
        .when('/prodlocation', {
            templateUrl: 'public/pages/prodlocation.html'
            , controller: 'produitLocationController'
            ,  access: {restricted: false},
                admin: {restricted: false}

        })
        .when('/contact', {
            templateUrl: 'public/pages/contact.html',
            controller : 'emailController'
            ,  access: {restricted: false},
                admin: {restricted: false}


        })

    .when('/products', {
            templateUrl: 'public/pages/products.html'
            , controller: 'produitController'
            ,  access: {restricted: true},
                admin: {restricted: true}

        }).when('/commandes/:itemId', {
            templateUrl: 'public/pages/commandes.html'
            , controller: 'AdminUserCtrl'
            ,  access: {restricted: true},
                admin: {restricted: true}

        })
        .when('/logout', {
            templateUrl: 'public/pages/vide.html'
            , controller: 'LogoutCtrl'
            ,  access: {restricted: true},
                admin: {restricted: false}

        })
        .when('/user', {
            templateUrl: 'public/pages/users.html'
            , controller: 'AdminUserCtrl'
            ,  access: {restricted: true},
                admin: {restricted: true}

        })
        .when('/dash', {
            templateUrl: 'public/pages/dashbord.html'
            , controller: 'AdminUserCtrl'
            ,  access: {restricted: true},
                admin: {restricted: true}

        })
        .when('/panier', {
            templateUrl: 'public/pages/panier.html'
            , controller: 'DetailsProduitController'
            ,  access: {restricted: true},
                admin: {restricted: false}

        })
        .when('/football', {
            templateUrl: 'public/pages/football.html'
            , controller: 'footballController'
            ,  access: {restricted: false},
                admin: {restricted: false}

        })
        .when('/golf', {
            templateUrl: 'public/pages/golf.html'
            , controller: 'golfController'
            ,  access: {restricted: false},
                admin: {restricted: false}
        })
        .when('/cyclisme', {
            templateUrl: 'public/pages/cyclisme.html'
            , controller: 'cyclismeController'
            ,  access: {restricted: false},
                admin: {restricted: false}

        })
        .when('/tennis', {
            templateUrl: 'public/pages/tennis.html'
            , controller: 'tennisController'
            ,  access: {restricted: false},
                admin: {restricted: false}

        })
        .when('/details/:itemId', {
            templateUrl: 'public/pages/details/details.html'
            , controller: 'DetailsProduitController'
            ,  access: {restricted: false},
                admin: {restricted: false}
        })


    .otherwise({
        redirectTo: '/home'
    })
}])
// .run(function ($rootScope, $location, $route, AuthService) {
//   $rootScope.$on('$routeChangeStart',
//     function (event, next, current) {
//       AuthService.getUserStatus()
//            .then(function(){
//           if (next.access.restricted
//             && !AuthService.isLoggedIn()) {
//             $location.path('/login');
//             // $route.reload();
//           }
//           //admin restriction
//           if (next.admin.restricted
//             && $rootScope.isAdmin === false
//             && !AuthService.isLoggedIn()) {
//             alert('This page is accessed only by admins');
//             $location.path('/football');
//             // $route.reload();
//           }
//     });
// });});

// affichage de popup pour se connecter a facebook et verification de l'application par un id génénrée de fb
window.fbAsyncInit = function () {
    FB.init({
        appId: '485968178269032'
        , xfbml: true
        , version: 'v2.6'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
