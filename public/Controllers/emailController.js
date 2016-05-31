angular.module('app').controller('emailController', ['$scope', '$http', function ($scope, $http) {

    $scope.email = {};
    //    fonction envoyer un email
    $scope.send = function (email) {
        $http.get('email/send/' + email.contactEmail + '/' + email.contactName + '/' + email.contactSubject + '/' + email.contactMsg).success(function (data) {
            console.log(data)
            $scope.email = data;
            $scope.email.contactEmail = "";
            $scope.email.contactMsg = "";
            $scope.email.contactName = "";
            $scope.email.contactSubject = "";
        });
    }
    $scope.emails = [];
    //    recuperer tous les emails
    $http.get('email/').success(function (data) {
        $scope.emails = data;
    })

}])