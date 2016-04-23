angular.module('app').controller('golfController',['$scope', '$http',function($scope,$http){
  $http.get('data/dataGolf.json').success(function(data) {
     $scope.golfs= data;
})
}]);
angular.module('app').controller('DetailsControllerGolf', ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams){
    $http.get('data/dataGolf.json').success(function(golfs){
        $scope.golfs = golfs;
        $scope.whichItem = $routeParams.itemId;
    });
}]);
