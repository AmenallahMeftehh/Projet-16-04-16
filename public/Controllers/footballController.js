angular.module('app').controller('footballController',['$scope', '$http',function($scope,$http){
  $http.get('/produits/categorie/football').success(function(data) {
     $scope.footballs= data;
})
$scope.maxSize = 9;
$scope.currentPage = 1;
$scope.totalItems = 0;
$scope.prix=500;



}]);
