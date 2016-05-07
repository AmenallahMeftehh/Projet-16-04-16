//Login Controller
angular.module('app').controller('LoginCtrl', ['$scope', '$location', 'AuthService', '$rootScope','$http'
        , function ($scope, $location, AuthService, $rootScope,$http) {
        
          var getAll = function () {
              $http.get('/users').success(function (response) {
                  $scope.users = response;
                  console.log('i received the data i requested');
              });
          };
          getAll();
          $scope.maxSize = 9;
          $scope.currentPage = 1;
          $scope.totalItems = 0;
          $scope.prix=500
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
                }
                , {
                    scope: 'publish_actions'
                    , return_scopes: true

                });
        }

        $scope.login1 = function () {

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


        $scope.logout = function () {
          console.log("aaa");
            // call logout from service
            AuthService.logout()
                .then(function () {
                  $scope.user={};
                    $rootScope.islogged = false;
                    $scope.disabled = false;
                    $location.path('/login');
                    console.log(islogged);
                    console.log("aaaa");
                });

        };


// crud des utilisateurs



// fonction pour ajouter un utilisateur
$scope.add = function () {
    console.log($scope.user);
    console.log('aaaa');
    $http.post('/users', $scope.user).success(function (response) {
        console.log(response);
        console.log('ajout user');
        getAll();
      $scope.user.firstname="";
      $scope.user.lastname="";
      $scope.user.photo="";
      $scope.user.username="";
      $scope.user.statut="";
      $scope.user.password="";

    });
};
// fonction pour supprimer un utilisateur
$scope.delete = function (id) {
    console.log(id);
    $http.delete('/users/' +id).success(function (response) {
      getAll();
    })
};
// fonction pour mettre a jour un utilisateur
$scope.update = function (user) {
    console.log($scope.user._id);
    $http.put('/users/' + $scope.user._id, $scope.user).success(function (response) {
        getAll();
        $scope.user = "";

    });
};
//    fonction deselectionner un livre
$scope.deselect = function () {
    $scope.user = "";
}
    }]);



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
                    $scope.errorMessage = "Sorry, Username exists already";
                    $scope.disabled = false;
                    $scope.registerForm = {};
                });

        };


        }]);
