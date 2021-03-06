//Login Controller
angular.module('app').controller('LoginCtrl', ['$route', '$scope', '$location', 'AuthService', '$rootScope', '$http', '$mdBottomSheet'
    , function ($route, $scope, $location, AuthService, $rootScope, $http, $mdBottomSheet) {

        $(document).ready(function () {
            $('.carousel').carousel({
                interval: 3000
            })
        });
        $rootScope.user = $scope.user;

        $rootScope.islogged = false;
        $rootScope.isadmin = false;

        //recuperer la session d'un utilisateur'
        $http.get('/users/session').success(function (response) {
            console.log(response);
            if (response) {
                $rootScope.islogged = true;

            }
            if (response.role === "admin") {
                $rootScope.isadmin = true;
            }
        });

        // recuperer tous les utilisateurs
        var getAll = function () {
            $http.get('/users').success(function (response) {
                $scope.users = response;
                console.log('i received all users');
            });
        };

        // pagination
        $scope.maxSize = 9;
        $scope.currentPage = 1;
        $scope.totalItems = 0;
        $scope.prix = 500;

        // fonction pour recuperer un utilisateur
        $scope.recup = function (id) {
            console.log(id);
            $http.get('/users/' + id).success(function (response) {
                $scope.user = response;
                console.log($scope.user);

            });
        };

        // se connecter avec facebook
        $scope.FBLogin = function () {
                FB.login(function (response) {
                    if (response.authResponse) {
                        console.log('Welcome!  Fetching your information.... ');

                        FB.api('/me', function (response) {
                            console.log('Good to see you, ' + response.name + '.');
                            console.log(response);
                            $rootScope.islogged = true;
                            $rootScope.status = true;
                            $rootScope.user = response;
                            $location.path('/home');
                            $route.reload();
                        });
                    } else {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                }, {
                    scope: 'publish_actions'
                    , return_scopes: true
                });
            }
            // fonction se connecter avec login et password
        $scope.loginConnect = function () {
            // initial values
            $scope.error = false;
            $scope.disabled = true;
            // call login from service
            AuthService.login($scope.user.username, $scope.user.password)
                // handle success
                .then(function () {
                    console.log('edd');
                    $scope.disabled = false;
                    $rootScope.islogged = true;
                    $rootScope.status = true;
                    $rootScope.user = $scope.user;
                    $location.path('/home');
                    $route.reload();


                    if ($scope.user.role === "admin") {
                        $rootScope.isadmin = true;

                    }
                })
                // handle error
                .catch(function () {
                    $scope.error = true;
                    $scope.errorMessage = "Invalid username and/or password";
                    $scope.disabled = false;
                    $scope.user = {};
                    $rootScope.islogged = false;
                });
            console.log(AuthService.getUserStatus());

        };

        // fonction pour se deconnecter
        $scope.logout = function () {
            console.log("gggg")
                // appel de la fonction logout
            AuthService.logout()
                .then(function () {
                    $location.path('/login');
                    $rootScope.islogged = false;
                    $rootScope.isadmin = false;
                });

        };
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


    }])