angular.module('app').controller('cyclismeController',['$scope', '$http',function($scope,$http){
  $http.get('/produits/categorie/cyclisme').success(function(data) {
   $scope.cyclisme= data;
});
}]);
angular.module('app').controller('DetailsController', ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams){
    $http.get('/produits/categorie/cyclisme').success(function(data){
      $scope.cyclismes = data;
      $scope.whichItem = $routeParams.itemId;
    });
}]);
