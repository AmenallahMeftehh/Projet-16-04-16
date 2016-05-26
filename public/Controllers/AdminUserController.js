angular.module('app').controller('AdminUserCtrl', ['$scope', '$location', 'AuthService', '$http','$routeParams'

    , function ($scope, $location, AuthService, $http,$routeParams) {
        $scope.user={};
        var id = $routeParams.itemId;
        // recuperer un produit par id
        $http.get('/users/' + id).success(function (data) {
            $scope.user = data[0];
            console.log($scope.user)
        });
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
        $scope.prix = 500;
        // fonction pour recuperer un utilisateur
        $scope.recup = function (id) {
            console.log(id);
            $http.get('/users/' + id).success(function (response) {
                $scope.user = response;
                console.log($scope.user);

            });
        };


        //fonction pour ajouter un utilisateur
        $scope.add = function () {
            // initial values
            $scope.error = false;
            $scope.disabled = true;

            // call register from service
            AuthService.register($scope.user.firstname
                    , $scope.user.lastname
                    , $scope.user.username
                    , $scope.user.password
                    , $scope.user.photo
                    , $scope.user.statut)
                // handle success
                .then(function () {

                    $scope.disabled = false;
                    $scope.user = {};
                    getAll();
                })
                // handle error
                .catch(function () {
                    $scope.error = true;
                    $scope.errorMessage = "Sorry, Username exists already";
                    $scope.disabled = false;
                    $scope.user = {};
                });

        };


        // fonction pour supprimer un utilisateur
        $scope.delete = function (id) {
            console.log(id);
            $http.delete('/users/' + id).success(function (response) {
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


        // Dashboard pour l'dministrateur

        $scope.user ={};
        $scope.dataqt =[];
        $scope.dataqtpie =[];
        $scope.labelsdate = []
        $scope.labelnomproduit = []
        var dataqt = function () {
            $http.get('/users').success(function (response) {
                $scope.users = response;
                console.log(response);
                for(var i=0;i<$scope.users.length;i++){
                  console.log($scope.users[i]);
                  console.log($scope.users[i].Commande);
                  for (var j = 0; j < $scope.users[i].Commande.length; j++) {

                  $scope.dataqt.push($scope.users[i].Commande[j].qt);
                  console.log($scope.data);
                    }
                }
            });
            return $scope.dataqt;
        };

        var dataqtpie = function () {
            $http.get('/users').success(function (response) {
                $scope.users = response;
                console.log(response);
                for(var i=0;i<$scope.users.length;i++){
                  console.log($scope.users[i]);
                  console.log($scope.users[i].Commande);
                  for (var j = 0; j < $scope.users[i].Commande.length; j++) {

                  $scope.dataqtpie.push($scope.users[i].Commande[j].qt);
                  console.log($scope.data);
                    }
                }
            });
            return $scope.dataqtpie;
        };
        $scope.dataqt=[dataqt()];
        $scope.dataqtpie=dataqtpie();

        console.log($scope.dataqt);
        // fonction pour recupere les date de validation de chaque commande pour tous les utilisateurs
        var getDateVal = function () {
            $http.get('/users').success(function (response) {
                $scope.users = response;
                console.log(response);
                for(var i=0;i<$scope.users.length;i++){
                  console.log($scope.users[i]);
                  console.log($scope.users[i].Commande);
                  for (var j = 0; j < $scope.users[i].Commande.length; j++) {

                  $scope.labelsdate.push(new Date($scope.users[i].Commande[j].dateValidation).getDate());
                  console.log($scope.labelsdate);
                    }
                }
            });
            return $scope.labelsdate;
        };
$scope.labelsdate=getDateVal();
console.log($scope.labels);
// recuperer tous les produits dans les commandes
var getnomProd = function () {
    $http.get('/users').success(function (response) {
        $scope.users = response;
        console.log(response);
        for(var i=0;i<$scope.users.length;i++){
          console.log($scope.users[i]);
          console.log($scope.users[i].Commande);
          for (var j = 0; j < $scope.users[i].Commande.length; j++) {
            $http.get('produits/'+$scope.users[i].Commande[j].idproduit).success(function(data){
              console.log(data);
              $scope.labelnomproduit.push(data.nom);
              console.log($scope.labelnomproduit);

            })

            }
        }
    });
    return $scope.labelnomproduit;
};


$scope.labelnomproduit= getnomProd();
$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        // $scope.series = ['Series A', 'Series B'];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };

 //        $scope.labelspie = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
 // $scope.datapie = [300, 500, 100];


        // $http.get('users/'+user._id+'/commande').success(function(data){
        //
        // $scope.user=data;
        //     for(var i= 0; i<data.Commande.length;i++){
        //         $scope.quantite.push(data.Commande[i].qt);
        //
        //     }
        //
        // })

    }]);
