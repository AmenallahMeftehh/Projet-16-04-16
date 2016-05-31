angular.module('app').controller('AdminUserCtrl', ['$scope', '$location', 'AuthService', '$http', '$routeParams'


    
    , function ($scope, $location, AuthService, $http, $routeParams) {
        $scope.user = {};
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
                $scope.user = response[0];
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


        // Partie Dashboard pour l'dministrateur

        $scope.user = {};
        $scope.dataqt = [];
        $scope.dataqtpie = [];
        $scope.labelsdate = []
        $scope.labelnomproduit = []
            //        fonction pour recuperer les quantités vendues pour la courbe
        var dataqt = function () {
            $http.get('/users').success(function (response) {
                $scope.users = response;
                console.log(response);
                for (var i = 0; i < $scope.users.length; i++) {
                    for (var j = 0; j < $scope.users[i].Commande.length; j++) {

                        $scope.dataqt.push($scope.users[i].Commande[j].qt);
                    }
                }
            });
            return $scope.dataqt;
        };
        //        fonction pour recuperer les quantités vendues pour le chart pie
        var dataqtpie = function () {
            $http.get('/users').success(function (response) {
                $scope.users = response;
                console.log(response);
                for (var i = 0; i < $scope.users.length; i++) {

                    for (var j = 0; j < $scope.users[i].Commande.length; j++) {

                        $scope.dataqtpie.push($scope.users[i].Commande[j].qt);
                    }
                }
            });
            return $scope.dataqtpie;
        };
        $scope.dataqt = [dataqt()];
        $scope.dataqtpie = dataqtpie();

        console.log($scope.dataqt);
        // fonction pour recupere les date de validation de chaque commande 
        var getDateVal = function () {
            $http.get('/users').success(function (response) {
                $scope.users = response;
                console.log(response);
                for (var i = 0; i < $scope.users.length; i++) {

                    for (var j = 0; j < $scope.users[i].Commande.length; j++) {

                        $scope.labelsdate.push(new Date($scope.users[i].Commande[j].dateValidation).getDate());
                    }
                }
            });
            return $scope.labelsdate;
        };
        $scope.labelsdate = getDateVal();
        console.log($scope.labels);
        // recuperer tous les produits dans les commandes
        var getnomProd = function () {
            $http.get('/users').success(function (response) {
                $scope.users = response;
                console.log(response);
                for (var i = 0; i < $scope.users.length; i++) {
                    for (var j = 0; j < $scope.users[i].Commande.length; j++) {
                        $http.get('produits/' + $scope.users[i].Commande[j].idproduit).success(function (data) {
                            $scope.labelnomproduit.push(data.nom);

                        })

                    }
                }
            });
            return $scope.labelnomproduit;
        };


        $scope.labelnomproduit = getnomProd();


        $scope.produits = [];

        // des KPI indicateurs de performance pour la gestion des stock
        $http.get('produits/').success(function (data) {
            $scope.produits = data;
            console.log($scope.produits);
            for (var i = 0; i < $scope.produits.length; i++) {}

        })

        //fonction pour indiquer les informations dans les chart
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };


    }]);