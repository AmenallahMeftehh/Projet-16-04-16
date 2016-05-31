// controlleur details produit
angular.module('app').controller('DetailsProduitController', ['$route', '$location', '$scope', '$http', '$routeParams', '$rootScope', '$mdDialog'   , function ($route, $location, $scope, $http, $routeParams, $rootScope
        , $mdDialog, $mdBottomSheet) {

        $scope.produit = {};
        var id = $routeParams.itemId;
        // recuperer un produit par id
        $http.get('/produits/' + id).success(function (data) {
            $scope.produit = data;
        });
        // initialisation de la quantité demandée dans le panier
        $scope.date = new Date();
        $scope.minDate = new Date();
        // fonction pour enlever les dates déja reservées pour un produit bien determiné
        $scope.onlyAvailable = function (date) {
            var available = true;
            if ($scope.produit.reservation) {
                for (var i = 0; i < $scope.produit.reservation.length; i++) {
                    if ((new Date($scope.produit.reservation[i].dateReservation).getFullYear() === date.getFullYear()) && (new Date($scope.produit.reservation[i].dateReservation).getMonth() === date.getMonth()) && (new Date($scope.produit.reservation[i].dateReservation).getDate() === date.getDate())) {
                        available = false;
                    }
                }
            }
            return available;
        };
        $scope.qt = 1;
        $scope.prod = {};

        $scope.produits = [];
        $scope.tot = 0;
        // fonction pour recuperer tous les produits dans le panier d'un user
        var getAll = function () {

            $http.get('/users/session').success(function (response) {
                $http.get('/users/' + response._id).success(function (user) {
                    $scope.iduser = user[0]._id;
                    $http.get('users/' + $scope.iduser + '/panier').success(function (data) {
                        console.log(data)
                        $scope.panier = data[0].panier;
                        for (var i = 0; i < $scope.panier.length; i++) {
                            $scope.produits.push($scope.panier[i]);
                            $scope.tot += $scope.panier[i].totalprixproduit;
                        }
                        console.log('i received the data i requested');

                    })

                });
            });

        };
        // appel au fonction getAll()
        getAll();
        // parametres de pagination
        $scope.maxSize = 6;
        $scope.currentPage = 1;
        $scope.totalItems = 0;
        $scope.prix = 500

        // reserver un produit par un utilisateur a une date bien détérminée
        $scope.reserver = function (date, produit) {
            console.log(produit._id);
            console.log(date);
            $http.get('/users/session').success(function (response) {
                $scope.messageUser = "Il faut s'authentifier";
                $http.get('/users/' + response._id).success(function (user) {

                    $http.post('produits/' + produit._id + '/reservation/' + user[0].username + '/date/' + date).success(function (res) {
                        $scope.onlyAvailable(date);
                        $scope.date = "";
                        console.log("callback produit reservé pour la date" + date);
                        $route.reload();

                    });
                });

                $route.reload();

            });
        }

        // fonction de pop up pour la reservation
        $scope.showConfirm = function (ev, date, produit) {
            // Appending dialog to document.body to cover sidenav in docs app
            $scope.disable = false;
            var confirm = $mdDialog.confirm()
                .title('Voulez vous reserver cet produit?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Reserver!')
                .cancel('Annuler');

            $mdDialog.show(confirm).then(function () {
                $scope.status = 'reservation confirmée.';
                $scope.reserver(date, produit);
                $scope.disable = true;
            }, function () {
                $scope.status = 'You decided to keep your debt.';
            });
        };

        // fonction de pop up pour ajouter au panier
        $scope.showConfirm1 = function (ev, produit, qt) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Voulez vous ajouter ce produit a votre panier?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Ajouter')
                .cancel('Annuler');

            $mdDialog.show(confirm).then(function () {
                $scope.status = 'Ajout avec succès.';
                $scope.addpanier(produit, qt);
            }, function () {
                $scope.status = 'You decided to keep your debt.';
            });
        };

        // ajouter un produit dans un panier
        $scope.addpanier = function (produit, qt) {
            console.log(produit._id);

            $http.get('/users/session').success(function (response) {
                $scope.user = response;
                $http.get('/users/' + $scope.user._id + '/panier/' + produit._id + '/' + qt + '/' + produit.prix).success(function (res) {
                    $route.reload();
                })

            })
        };
        // methode vider le panier
        $scope.viderpanier = function () {
                $http.get('/users/session').success(function (response) {
                    $http.get('/users/' + response._id).success(function (data) {
                        $scope.user = data[0];
                        $http.delete('users/' + $scope.user._id + '/panier').success(function (data) {
                            $route.reload()
                        });
                    })
                })
            }
            //fonction pour valider un panier
        $scope.validepanier = function () {
            $scope.produit = {}
            $http.get('/users/session').success(function (response) {
                $scope.user = response;
                console.log($scope.user);
                for (var i = 0; i < $scope.panier.length; i++) {
                    let product = $scope.panier[i]
                    $http.get('/produits/' + product.idproduit._id).success(function (data) {

                        $scope.produit = data;

                        $scope.produit.quantite -= product.qt;
                        $http.put('/produits/' + $scope.produit._id, $scope.produit).success(function (data) {

                        });

                        $http.get('users/' + $scope.user._id + '/panierreserve/' + product.idproduit._id + '/' + product.qt + '/' + product.totalprixproduit).success(function (data) {

                        })

                        $scope.viderpanier();
                        $route.reload();

                    })


                }
            });

        };
        //        fonction pour supprimer un produit d'un panier'
        $scope.delete = function (id) {
            $http.get('/users/session').success(function (response) {
                $scope.user = response;
                $http.delete('/users/' + $scope.user._id + '/panier/' + id).success(function (data) {
                    $scope.produit = null;
                    console.log('produit supprimés');
                    $route.reload();
                });
            });
        }


}]);