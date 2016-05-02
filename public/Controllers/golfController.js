angular.module('app').controller('golfController',['$scope', '$http',function($scope,$http){
  $http.get('/produits/categorie/golf').success(function(data) {
     $scope.golfs= data;
})
$scope.maxSize = 9;
$scope.currentPage = 1;
$scope.totalItems = 0;
$scope.prix=500
}]);
angular.module('app').controller('DetailsControllerGolf', ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams){
      var id =$routeParams.itemId;
      console.log(id);
      $http.get('/produits/'+id).success(function(data){
        $scope.produit = data;});
}]);
