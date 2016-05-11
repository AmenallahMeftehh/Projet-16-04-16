angular.module('app').controller('tennisController', ['$scope', '$http', function ($scope, $http) {

    //    recuperer tous les produits de categorie tennis
    $http.get('/produits/categorie/tennis').success(function (data) {
        $scope.tennis = data;
    });
    $scope.maxSize = 9;
    $scope.currentPage = 1;
    $scope.totalItems = 0;
    $scope.prix = 500
}]);