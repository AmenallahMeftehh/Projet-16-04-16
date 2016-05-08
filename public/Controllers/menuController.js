'use strict';

angular.module('app').controller('MenuController',['$rootScope','$scope','$location', 'AuthService',
function($rootScope, $scope, $location, AuthService){

AuthService.getUserStatus()
.then(function(){
  if (!AuthService.isLoggedIn()){
    // console.log(true);
    $rootScope.status = true;
  }else{
    // console.log(false);
    $rootScope.status = false;
  }
});
// verifier si l'utilisateur est admin ou pas
AuthService.isAdmin(){
  if(AuthService.isLoggedIn())&&($scope.loginForm.statut === "admin") {
      return true;
  } else {
      return false;
  }
}


  $scope.logout = function () {
    console.log("From logout");
    // call logout from service
    AuthService.logout()
      .then(function () {
        $location.path('/login');
      });

  };

  $scope.login = function () {

    // valeurs initial
    $scope.error = false;
    $scope.disabled = true;

    // appel de la fonction login depuis le service
    AuthService.login($scope.loginForm.username, $scope.loginForm.password)
      // en cas de success
      .then(function () {
        $location.path('/profile');
        $rootScope.status = false;
        $scope.disabled = false;
        $scope.loginForm = {};
      })
      // en cas d'echec
      .catch(function () {
        $scope.error = true;
        $scope.errorMessage = "Nom d'utilisateur et/ou mot de passe est invalide";
        $scope.disabled = false;
        $scope.loginForm = {};
      });
      console.log(AuthService.getUserStatus());

  };

  // Categories.query(function(data) {
  //   $scope.categories = data;
  //
  // });
}]);
