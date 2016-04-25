angular.module('app').controller('golfController',['$scope', '$http',function($scope,$http){
  $http.get('/bdchallenge').success(function(data) {
     $scope.golfs= data[3].produits;
})
}]);
angular.module('app').controller('DetailsControllerGolf', ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams){
    $http.get('bdchallenge').success(function(data){
        $scope.golfs = data[3].produits;
        $scope.whichItem = $routeParams.itemId;
    });
}]);
