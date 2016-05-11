angular.module('app').controller('LogoutCtrl', ['$scope', '$location', 'AuthService', '$rootScope','$http'
        , function ($scope, $location, AuthService, $rootScope,$http) {

          AuthService.logout()
          .then(function () {
            $location.path('/login');
            $rootScope.islogged = false;
            console.log('aaaaaaaaaaa');
          });
}]);
