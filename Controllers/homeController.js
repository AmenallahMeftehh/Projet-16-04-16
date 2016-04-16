angular.module('app').controller('homeController',['$scope',function($scope){
     $(document).ready(function() {
                 $('.carousel').carousel({
                     interval: 5000
                 })
             });

}]);
