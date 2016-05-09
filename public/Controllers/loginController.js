//Login Controller
angular.module('app').controller('LoginCtrl', ['$scope', '$location', 'AuthService', '$rootScope','$http'
        , function ($scope, $location, AuthService, $rootScope,$http) {
// recuperer tous les utilisateurs
$(document).ready(function() {
            $('.carousel').carousel({
                interval: 2000
            })
        });

$rootScope.islogged = false;

$http.get('/users/session').success(function(response){
console.log(response);
  if(response){
           $rootScope.islogged = true;
}
  });
          var getAll = function () {
              $http.get('/users').success(function (response) {
                  $scope.users = response;
                  console.log('i received the data i requested');
              });
          };

          // pagination
          $scope.maxSize = 9;
          $scope.currentPage = 1;
          $scope.totalItems = 0;
          $scope.prix=500;

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
                            $location.path('/panier');
                            $scope.disabled = false;
                            $scope.user = {};
                        });
                    } else {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                },{
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

                    $location.path('/home');
                    if ($scope.user.statut ==="admin") {
                      $rootScope.isAdmin = true;
                      $scope.user = {};

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


        };

        // fonction pour se deconnecter
        $scope.logout = function () {
console.log("gggg")
          // appel de la fonction logout
          AuthService.logout()
          .then(function () {
            $location.path('/login');
            $rootScope.islogged = false;

          });

     };



    }])
