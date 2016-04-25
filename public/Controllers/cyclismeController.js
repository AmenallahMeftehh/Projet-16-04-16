angular.module('app').controller('cyclismeController',['$scope', '$http',function($scope,$http){
  $http.get('/bdchallenge').success(function(data) {   
   $scope.cyclisme= data[0].produits;
});
}]);
angular.module('app').controller('DetailsController', ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams){
    $http.get('bdchallenge').success(function(data){
      $scope.cyclismes = data[0].produits;
      $scope.whichItem = $routeParams.itemId;
    });
}]);
