//Login Controller
angular.module('app').controller('LoginCtrl', ['$scope', '$location', 'AuthService', '$rootScope','$http'
      ,'$mdBottomSheet' , function ($scope, $location, AuthService, $rootScope,$http,$mdBottomSheet) {
// recuperer tous les utilisateurs
$(document).ready(function() {
            $('.carousel').carousel({
                interval: 2000
            })
        });
    $(document).ready(function() {
              $('#MainMenu').append('<li><a href="#" class="dropdown-toggle" data-toggle="dropdown">Reports</a></li>');
        });
$rootScope.islogged = false;
$rootScope.isadmin = false;



  $http.get('/users/session').success(function(response){
    console.log(response);
          if(response){
            $rootScope.islogged = true;

          }
          if(response.statut){
                  $rootScope.isadmin = true;
                }
        });


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
          $scope.prix=500;

          // fonction pour recuperer un utilisateur
            $scope.recup = function (id) {
              console.log(id);
              $http.get('/users/' + id).success(function (response) {
                $scope.user = response;
                console.log($scope.user);

              });
            };
// exemple menu
$scope.showListBottomSheet = function() {
$scope.alert = '';
$mdBottomSheet.show({
  templateUrl: 'public/pages/nav.html',
  controller: 'LoginCtrl'
}).then(function(clickedItem) {
  $scope.alert = clickedItem['name'] + ' clicked!';
});
};
// menu exemple
    $scope.items = [
      { name: 'Share', icon: 'share-arrow' },
      { name: 'Upload', icon: 'upload' },
      { name: 'Copy', icon: 'copy' },
      { name: 'Print this page', icon: 'print' },
    ];

    $scope.listItemClick = function($index) {
      var clickedItem = $scope.items[$index];
      $mdBottomSheet.hide(clickedItem);
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
                            $location.path('/home');
                            console.log("aa")
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
