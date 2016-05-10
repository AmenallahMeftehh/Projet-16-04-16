// controlleur details produit
angular.module('app').controller('DetailsProduitController', ['$location','$scope', '$http','$routeParams',
    '$rootScope','$mdDialog',function($location,$scope, $http, $routeParams,$rootScope,$mdDialog){
        $scope.produit={};
        var id =$routeParams.itemId;
        // console.log(id);
        $http.get('/produits/'+id).success(function(data){
          $scope.produit = data;});

        $scope.quantite=1;
        $scope.date = new Date();

        // fonction pour enlever les dates déja reservé pour cet article
        $scope.onlyAvailable = function(date) {
          var available = true;
          if($scope.produit.reservation)
          {
            for (var i=0 ; i<$scope.produit.reservation.length;i++){
            if ((new Date($scope.produit.reservation[i].dateReservation).getFullYear()===date.getFullYear())
            &&(new Date($scope.produit.reservation[i].dateReservation).getMonth()===date.getMonth())
            &&(new Date($scope.produit.reservation[i].dateReservation).getDate()===date.getDate()))
            {
              available = false;
            }
          }}
          return available;
        };

// fonction pour recuperer tous les produits dans le panier d'un user
      var getAll = function () {
        $scope.produits = [] ;
        console.log("getAll");
        $http.get('/users/session').success(function(response){
          console.log(response._id);
          $http.get('/users/'+response._id).success(function(user){
            console.log(user);
              $scope.cart = user[0].panier;
              console.log($scope.cart);
              for (var i = 0; i < $scope.cart.length; i++) {
                 $http.get('/produits/'+$scope.cart[i]).success(function(data){
                    console.log(data);
                     $scope.produits.push(data);

                     console.log('aaaaa');

               });

                   }
              console.log('i received the data i requested');
          });});
      };
      // appel au fonction getAll()
      getAll();
      // parametres de pagination
      $scope.maxSize = 6;
      $scope.currentPage = 1;
      $scope.totalItems = 0;
      $scope.prix=500

// reserver un produit par un utilisateur a une date bien détérminée
$scope.reserver=function(date,produit){
  console.log(produit._id);
  console.log(date);
  $http.get('/users/session').success(function(response){
    console.log(response._id);
    $scope.messageUser = "Il faut s'authentifier";
    $http.get('/users/'+response._id).success(function(user){
      console.log(user[0]);

      $http.post('produits/'+produit._id+'/reservation/'+user[0]._id+'/date/'+date).success(function(res){
        $scope.onlyAvailable(date);
        $scope.date="";

        console.log("callback produit reservé pour la date"+date);
      });
    });
  });
}

// fonction pour le dialog pour la reservation
  $scope.showConfirm = function(ev,date,produit) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Voulez vous reserver cet produit?')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Reserver!')
          .cancel('Annuler');

    $mdDialog.show(confirm).then(function() {
      $scope.status = 'reservation confirmée.';
      $scope.reserver(date,produit);
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  };



// ajouter un produit dans un panier
      $scope.addpanier=function(produit){
        console.log(produit._id);
        $http.get('/users/session').success(function(response){
          $scope.user=response;
          $http.get('/users/'+$scope.user._id+'/panier/'+produit._id).success(function(res){
            console.log("callback ajout produit au panier");
            getAll();
          })

        })};


        // recuperer les produits d'un panier
//       var panier=function(){
//          $http.get('/users/session').success(function(response){
//            $scope.usercart=response.panier;
//
//             for (var i = 0; i < $scope.usercart.length; i++) {
//               $http.get('/produits/'+$scope.usercart[i]).success(function(data){
//                 $rootScope.produits.push(data);
//
//
//
//             });
//             }
//         })};
// panier();





        $scope.delete= function (produit) {
          $http.get('/users/session').success(function(response){
            $scope.user=response;

            console.log($scope.user);
            $http.delete('/users/'+$scope.user._id+'/panier/'+produit._id).success(function(data){
              $scope.produit=null;
              console.log('delete ok');
              getAll();




            });

                });
         }
}]);
