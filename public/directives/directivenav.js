angular.module('app').directive('navmenu', function() {
  return {
    restrict: 'E',
    templateUrl:'public/pages/nav.html',
    controller:['$scope','$http','$rootScope', function($scope,$http,$rootScope) {
      $rootScope.islogged = false;
      $rootScope.isadmin = false;

      $http.get('/users/session').success(function(response){
      console.log(response);
      $scope.user=response;
      $http.get('/users/'+$scope.user._id).success(function(user){
        console.log(user);
        if(user){
       $rootScope.islogged = true;
       if(user.statut){
         $rootScope.isadmin = true;

       }
      }

        });
          });
    }]
  };
});
