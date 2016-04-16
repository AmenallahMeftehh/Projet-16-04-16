angular.module('app',['ngRoute']).config(['$routeProvider',function($routeProvider){
$routeProvider
.when('/login',{
  templateUrl:'pages/login.html',

})
.when('/home',{
  templateUrl:'pages/home.html',

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
.otherwise({
    redirectTo: '/home'
          })

}]);
