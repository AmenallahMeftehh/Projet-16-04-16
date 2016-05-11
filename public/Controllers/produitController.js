angular.module('app').controller('produitController', ['$scope', '$http', function ($scope, $http) {

    //    recuperer tous les produits
    var getAll = function () {
        $http.get('/produits').success(function (response) {
            $scope.produits = response;
            console.log('i received all products');
        });
    };
    //    appel a la fonction getAll
    getAll();
    $scope.maxSize = 9;
    $scope.currentPage = 1;
    $scope.totalItems = 1;
    $scope.prix = 500;
    //fonction pour recuperer un produit par id
    $scope.recup = function (id) {
        console.log(id);
        $http.get('/produits/' + id).success(function (response) {
            $scope.produit = response;
            console.log($scope.produit);

        });
    };
    //fonction pour recupérer toutes les reservations d'un produit
    $scope.reservation = function (produit) {
        $http.get('/produits/' + $scope.produit._id + '/reservation').success(function (data) {
            console.log(data);
            $scope.reservations = data[1];
            for (var i = 0; i < $scope.reservations.length; i++) {
                $scope.reservation = $scope.reservations[i];
                $scope.reservations.push(reservation);
                // $http.get('/produits/'+$scope.produit+'reservation')

            }
        })
    };
    //fonction pour ajouter un produit
    $scope.addProduct = function () {
        console.log($scope.produit);
        console.log('aaaa');
        $http.post('/produits', $scope.produit).success(function (response) {
            console.log(response);
            console.log('bbb');
            getAll();
            $scope.produit.nom = "";
            $scope.produit.image = "";
            $scope.produit.prix = "";
            $scope.produit.quantite = "";
            $scope.produit.categorie = "";
            $scope.produit.prixlocation = "";
            $scope.produit.location = "";

        });
    };
    //    fonction pour supprimer un produit
    $scope.deleteProduct = function (id) {
        console.log(id);
        $http.delete('/produits/' + id).success(function (response) {
            getAll();
        })
    };
    // fonction pour mettre a jour un produit
    $scope.update = function (produit) {
        console.log($scope.produit._id);
        $http.put('/produits/' + $scope.produit._id, $scope.produit).success(function (response) {
            getAll();
            $scope.produit = "";

        });
    };
    //   fonction deselectionner un produit
    $scope.deselect = function () {
        $scope.produit = "";
    }



}]);
