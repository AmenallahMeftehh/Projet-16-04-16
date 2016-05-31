angular.module('app').controller('cyclismeController', ['$scope', '$http', function ($scope, $http) {

    //    recuperer tous les produits de categorie cyclisme
    $http.get('/produits/categorie/cyclisme').success(function (data) {
        $scope.cyclisme = data;
    });
    $scope.maxSize = 9;
    $scope.currentPage = 1;
    $scope.totalItems = 0;
    $scope.prix = 500;

}]);