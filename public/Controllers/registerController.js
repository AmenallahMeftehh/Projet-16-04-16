angular.module('app').controller('RegisterCtrl', ['$scope', '$location', 'AuthService'
        
    , function ($scope, $location, AuthService) {

        $scope.register = function () {

            // initial values
            $scope.error = false;
            $scope.disabled = true;

            // call register from service
            AuthService.register($scope.registerForm.firstname
                    , $scope.registerForm.lastname
                    , $scope.registerForm.username
                    , $scope.registerForm.password)
                // handle success
                .then(function () {
                    $location.path('/login');
                    $scope.disabled = false;
                    $scope.registerForm = {};
                })
                // handle error
                .catch(function () {
                    $scope.error = true;
                    $scope.errorMessage = "Désolé ce nom d'utilisateur existe déja";
                    $scope.disabled = false;
                    $scope.registerForm = {};
                });

        };


        }]);