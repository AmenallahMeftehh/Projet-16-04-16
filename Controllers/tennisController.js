angular.module('app').controller('tennisController',['$scope', '$http',function($scope,$http){
  $http.get('data/dataTennis.json').success(function(data) {
     $scope.tennis = data;
})
}]);
angular.module('app').controller('DetailsControllerTennis', ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams){
    $http.get('data/dataTennis.json').success(function(tennis){
        $scope.tennis = tennis;
        $scope.whichItem = $routeParams.itemId;
    });
}]);
