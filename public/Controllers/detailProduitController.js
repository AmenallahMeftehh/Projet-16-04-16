// controlleur details produit
angular.module('app').controller('DetailsProduitController', ['$location','$scope', '$http','$routeParams',
    '$rootScope',function($location,$scope, $http, $routeParams,$rootScope){
$scope.produit={};
        var id =$routeParams.itemId;
        // console.log(id);
        $http.get('/produits/'+id).success(function(data){
          $scope.produit = data;});

        $scope.quantite=1;
        $scope.myDate = new Date();
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
      getAll();
      $scope.maxSize = 9;
      $scope.currentPage = 1;
      $scope.totalItems = 0;
      $scope.prix=500

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
