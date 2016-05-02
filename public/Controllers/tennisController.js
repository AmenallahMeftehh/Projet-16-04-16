angular.module('app').controller('tennisController',['$scope', '$http',function($scope,$http){
  $http.get('/produits/categorie/tennis').success(function(data) {
     $scope.tennis = data;
})
}]);
angular.module('app').controller('DetailsControllerTennis', ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams){
    $http.get('bdchallenge').success(function(data){
        $scope.tennis = data[2].produits;
        $scope.whichItem = $routeParams.itemId;
    });
}]);
