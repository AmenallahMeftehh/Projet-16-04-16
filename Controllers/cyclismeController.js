angular.module('app').controller('cyclismeController',['$scope', '$http',function($scope,$http){
  $http.get('data/dataCycl.json').success(function(data) {
     $scope.cyclismes= data;
})
}]);
