angular.module('app').controller('tennisController',['$scope', '$http',function($scope,$http){
  $http.get('/produits/categorie/tennis').success(function(data) {
     $scope.tennis = data;
});
$scope.maxSize = 9;
$scope.currentPage = 1;
$scope.totalItems = 0;
$scope.prix=500
}]);
angular.module('app').controller('DetailsControllerTennis', ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams){
      var id =$routeParams.itemId;
      console.log(id);
      $http.get('/produits/'+id).success(function(data){
        $scope.produit = data;});
}]);
