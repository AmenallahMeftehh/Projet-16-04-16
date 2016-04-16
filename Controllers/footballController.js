angular.module('app').controller('footballController',['$scope', '$http',function($scope,$http){
  $http.get('data/dataFoot.json').success(function(data) {
     $scope.footballs= data;
})
}]);
