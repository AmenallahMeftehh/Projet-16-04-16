angular.module('app',['ngRoute']).config(['$routeProvider',function($routeProvider){
$routeProvider
.when('/login',{
  templateUrl:'pages/login.html',
  controller:'loginController'

})
.when('/home',{
  templateUrl:'pages/home.html',
  controller:'homeController'

})
.when('/panier',{
  templateUrl:'pages/panier.html',

})
.when('/football',{
  templateUrl:'pages/football.html',
  controller:'footballController'

})
.when('/golf',{
  templateUrl:'pages/golf.html',
  controller:'golfController'

})
.when('/cyclisme',{
  templateUrl:'pages/cyclisme.html',
  controller:'cyclismeController'

})
.when('/tennis',{
  templateUrl:'pages/tennis.html',
  controller:'tennisController'

})
.when('/details/:itemId', {
            templateUrl : 'pages/details/detailsCyclisme.html',
            controller : 'DetailsController'
        })
  .when('/detailsF/:itemId', {
              templateUrl : 'pages/details/detailsFoot.html',
              controller : 'DetailsControllerFoot'
          })
  .when('/detailsG/:itemId', {
              templateUrl : 'pages/details/detailsGolf.html',
              controller : 'DetailsControllerGolf'
                  })
  .when('/detailsT/:itemId', {
              templateUrl : 'pages/details/detailsTennis.html',
              controller : 'DetailsControllerTennis'
                  })

.otherwise({
    redirectTo: '/home'
          })

}]);
