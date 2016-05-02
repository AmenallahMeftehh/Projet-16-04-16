angular.module('app').controller('footballController',['$scope', '$http',function($scope,$http){
  $http.get('/produits/categorie/football').success(function(data) {
     $scope.footballs= data;
})
$scope.maxSize = 9;
$scope.currentPage = 1;
$scope.totalItems = 0;
$scope.prix=500;

$scope.recup=function(id){
  $http.get('/produits/'+id).success(function(data){
    $scope.produit = data;

});}
}]);
angular.module('app').controller('DetailsControllerFoot', ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams){

        var id =$routeParams.itemId;
        console.log(id);
        $http.get('/produits/'+id).success(function(data){
          $scope.produit = data;

      });

}]);
