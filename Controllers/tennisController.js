angular.module('app').controller('tennisController',['$scope', '$http',function($scope,$http){
  $http.get('data/dataTennis.json').success(function(data) {
     $scope.tennis = data;
})
}]);
