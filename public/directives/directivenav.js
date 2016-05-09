angular.module('app').directive('navmenu', function() {
  return {
    restrict: 'E',
    templateUrl:'public/pages/nav.html',
    controller:['$scope','$http','$rootScope', function($scope,$http,$rootScope) {
      $rootScope.islogged = false;

      $http.get('/users/session').success(function(response){
      console.log(response);
        if(response){
                 $rootScope.islogged = true;
      }
        });
    }]
  };
});
