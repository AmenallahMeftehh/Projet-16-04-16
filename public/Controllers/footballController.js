angular.module('app').controller('footballController',['$scope', '$http',function($scope,$http){
  $http.get('/produits/categorie/football').success(function(data) {
     $scope.footballs= data;
})
}]);
angular.module('app').controller('DetailsControllerFoot', ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams){
    $http.get('/bdchallenge').success(function(data){
        $scope.footballs = data[1].produits;
        $scope.whichItem = $routeParams.itemId;
    });
}]);
