angular.module('app').controller('cyclismeController',['$scope', '$http',function($scope,$http){
  $http.get('/produits/categorie/cyclisme').success(function(data) {
   $scope.cyclisme= data;
});
$scope.maxSize = 9;
$scope.currentPage = 1;
$scope.totalItems = 0;
$scope.prix=500;
}]);
