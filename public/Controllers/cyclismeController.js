angular.module('app').controller('cyclismeController',['$scope', '$http',function($scope,$http){
  $http.get('bdchallenge/').success(function(data) {
   $scope.cyclisme= data;
})
}]);
angular.module('app').controller('DetailsController', ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams){
    $http.get('data/dataCycl.json').success(function(cyclismes){
      $scope.cyclismes = cyclismes;
      $scope.whichItem = $routeParams.itemId;
    });
}]);
