angular.module('app').controller('LogoutCtrl', ['$scope', '$location', 'AuthService', '$rootScope', '$http'        
    , function ($scope, $location, AuthService, $rootScope, $http) {

        //            appel au service pour se deconnecter
        AuthService.logout()
            .then(function () {
                $location.path('/login');
                $rootScope.islogged = false;
                console.log('aaaaaaaaaaa');
            });
}]);