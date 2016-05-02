angular.module('app').controller('golfController',['$scope', '$http',function($scope,$http){
  $http.get('/produits/categorie/golf').success(function(data) {
     $scope.golfs= data;
})
}]);
angular.module('app').controller('DetailsControllerGolf', ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams){
    $http.get('/produits/categorie/golf').success(function(data){
        $scope.golfs = data;
        $scope.whichItem = $routeParams.itemId;
    });
}]);
