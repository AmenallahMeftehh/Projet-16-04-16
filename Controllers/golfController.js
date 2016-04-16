angular.module('app').controller('golfController',['$scope', '$http',function($scope,$http){
  $http.get('data/dataGolf.json').success(function(data) {
     $scope.golfs= data;
})
}]);
