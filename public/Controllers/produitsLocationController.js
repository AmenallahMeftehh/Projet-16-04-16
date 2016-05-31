angular.module('app').controller('produitLocationController', ['$scope', '$location', '$routeParams', 'AuthService', '$rootScope', '$http'
        
    , function ($scope, $location, $routeParams, AuthService, $rootScope, $http) {

        //            recuperer tous les produits a louer
        $http.get('/produits/location').success(function (data) {
            $scope.locations = data;
            console.log(data);
        });


        $scope.maxSize = 9;
        $scope.currentPage = 1;
        $scope.totalItems = 0;
        $scope.prix = 500;


            }]);