angular.module('app').controller('golfController', ['$scope', '$http', function ($scope, $http) {

    //    recuperer tous les produits de categorie golf
    $http.get('/produits/categorie/golf').success(function (data) {
        $scope.golfs = data;
    })
    $scope.maxSize = 9;
    $scope.currentPage = 1;
    $scope.totalItems = 0;
    $scope.prix = 500
}]);