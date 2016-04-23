angular.module('app',['ngRoute']).config(['$routeProvider',function($routeProvider){
$routeProvider
.when('/login',{
  templateUrl:'public/pages/login.html',
  controller:'loginController'
})
.when('/home',{
  templateUrl:'public/pages/home.html',
  controller:'homeController'

})
.when('/panier',{
  templateUrl:'public/pages/panier.html',

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
            templateUrl : 'public/pages/details/detailsCyclisme.html',
            controller : 'DetailsController'
        })
  .when('/detailsF/:itemId', {
              templateUrl : 'public/pages/details/detailsFoot.html',
              controller : 'DetailsControllerFoot'
          })
  .when('/detailsG/:itemId', {
              templateUrl : 'public/pages/details/detailsGolf.html',
              controller : 'DetailsControllerGolf'
                  })
  .when('/detailsT/:itemId', {
              templateUrl : 'public/pages/details/detailsTennis.html',
              controller : 'DetailsControllerTennis'
                  })

.otherwise({
    redirectTo: '/home'
          })

}]);
