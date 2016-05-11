// controlleur details produit
angular.module('app').controller('DetailsProduitController', ['$location', '$scope', '$http', '$routeParams', '$rootScope', '$mdDialog'

    , function ($location, $scope, $http, $routeParams, $rootScope
        , $mdDialog, $mdBottomSheet) {

        $scope.produit = {};
        var id = $routeParams.itemId;
        // recuperer un produit par id
        $http.get('/produits/' + id).success(function (data) {
            $scope.produit = data;
        });
        // initialisation de la quantité demandée dans le panier
        $scope.quantite = 1;
        $scope.date = new Date();

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

        // fonction pour recuperer tous les produits dans le panier d'un user
        var getAll = function () {
            $scope.produits = [];
            $http.get('/users/session').success(function (response) {
                $http.get('/users/' + response._id).success(function (user) {
                    $scope.cart = user[0].panier;
                    console.log($scope.cart);
                    for (var i = 0; i < $scope.cart.length; i++) {
                        $http.get('/produits/' + $scope.cart[i]).success(function (data) {
                            $scope.produits.push(data);

                            console.log("c'est bon !!");

                        });

                    }
                    console.log('i received the data i requested');
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
                console.log(response._id);
                $scope.messageUser = "Il faut s'authentifier";
                $http.get('/users/' + response._id).success(function (user) {
                    console.log(user[0]);

                    $http.post('produits/' + produit._id + '/reservation/' + user[0].username + '/date/' + date).success(function (res) {
                        $scope.onlyAvailable(date);
                        $scope.date = "";

                        console.log("callback produit reservé pour la date" + date);
                    });
                });
            });
        }

        // fonction de pop up pour la reservation
        $scope.showConfirm = function (ev, date, produit) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Voulez vous reserver cet produit?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Reserver!')
                .cancel('Annuler');

            $mdDialog.show(confirm).then(function () {
                $scope.status = 'reservation confirmée.';
                $scope.reserver(date, produit);
            }, function () {
                $scope.status = 'You decided to keep your debt.';
            });
        };

        // fonction de pop up pour ajouter au panier
        $scope.showConfirm1 = function (ev, produit) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Voulez vous ajouter ce produit a votre panier?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Ajouter')
                .cancel('Annuler');

            $mdDialog.show(confirm).then(function () {
                $scope.status = 'Ajout avec succès.';
                $scope.addpanier(produit);
            }, function () {
                $scope.status = 'You decided to keep your debt.';
            });
        };


        // ajouter un produit dans un panier
        $scope.addpanier = function (produit) {
            console.log(produit._id);
            $http.get('/users/session').success(function (response) {
                $scope.user = response;
                $http.get('/users/' + $scope.user._id + '/panier/' + produit._id).success(function (res) {
                    console.log("callback ajout produit au panier");
                    getAll();
                })

            })
        };


$scope.validePanier = function(){
  $http.get('/users/session').success(function (response) {
      $http.get('/users/' + response._id).success(function (data) {
          console.log(data[0]);
          $scope.user=data[0];
      console.log($scope.user);
      for(var i =0;i<$scope.user.panier.length;i++){
        $http.get('/produits/' + $scope.user.panier[i]).success(function (data) {
            $scope.produit = data;
        console.log($scope.produit.quantite);
        console.log($scope.quantite);

        $scope.produit.quantite-=$scope.quantite;
      });
      }
        $scope.user.panier = null;
        console.log('panier validé');
        getAll();
      });  });

      }

        $scope.delete = function (produit) {
            $http.get('/users/session').success(function (response) {
                $scope.user = response;
                $http.delete('/users/' + $scope.user._id + '/panier/' + produit._id).success(function (data) {
                    $scope.produit = null;
                    console.log('panier validé');
                    getAll();
                });
            });
        }


}]);