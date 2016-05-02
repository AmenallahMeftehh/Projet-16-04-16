angular.module('app').controller('tennisController',['$scope', '$http',function($scope,$http){
  $http.get('/produits/categorie/tennis').success(function(data) {
     $scope.tennis = data;
});
$scope.maxSize = 9;
$scope.currentPage = 1;
$scope.totalItems = 0;
$scope.prix=500
}]);
