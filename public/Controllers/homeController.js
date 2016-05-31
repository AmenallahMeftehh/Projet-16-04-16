angular.module('app').controller('homeController', ['$scope', function ($scope) {
    //    indiquer les le temps necessaire pour changer les images du carousel
    $(document).ready(function () {
        $('.carousel').carousel({
            interval: 2000
        })
    });
 
}]);