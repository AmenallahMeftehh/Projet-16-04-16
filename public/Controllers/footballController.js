angular.module('app').controller('footballController',['$scope', '$http',function($scope,$http){
  $http.get('data/dataFoot.json').success(function(data) {
     $scope.footballs= data;
})
}]);
angular.module('app').controller('DetailsControllerFoot', ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams){
    $http.get('data/dataFoot.json').success(function(footballs){
        $scope.footballs = footballs;
        $scope.whichItem = $routeParams.itemId;
    });
}]);
