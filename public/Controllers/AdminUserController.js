
ngular.module('app').controller('AdminUserCtrl', ['$scope', '$location', 'AuthService', '$rootScope','$http'
        , function ($scope, $location, AuthService, $rootScope,$http) {

// recuperer tous les utilisateurs
          var getAll = function () {
              $http.get('/users').success(function (response) {
                  $scope.users = response;
                  console.log('i received the data i requested');
              });
          };
          getAll();
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
