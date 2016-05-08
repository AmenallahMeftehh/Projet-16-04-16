// controlleur details produit
angular.module('app').controller('DetailsProduitController', ['$location','$scope', '$http','$routeParams',
    '$rootScope',function($location,$scope, $http, $routeParams,$rootScope){
        var id =$routeParams.itemId;
        // console.log(id);
        $http.get('/produits/'+id).success(function(data){
          $scope.produit = data;});

        $scope.quantite=1;

      var getAll = function () {
        $scope.produits = [] ;
        $http.get('/users/session').success(function(response){
              console.log(response);
              $scope.cart = response.panier;
              for (var i = 0; i < $scope.cart.length; i++) {
                 $http.get('/produits/'+$scope.cart[i]).success(function(data){
                    console.log(data);
                     $scope.produits.push(data);



               });

                   }
              console.log('i received the data i requested');
          });
      };
      getAll();
      $scope.maxSize = 9;
      $scope.currentPage = 1;
      $scope.totalItems = 0;
      $scope.prix=500

// ajouter un produit dans un panier
      $scope.addpanier=function(produit){
        console.log("aaaaaaaa");
        console.log(produit._id);
        $http.get('/users/session').success(function(response){
          console.log(response);
          $scope.user=response;

          $http.get('/users/'+$scope.user._id+'/panier/'+produit._id).success(function(res){
            console.log(res);
            $scope.produits.push(produit._id)
            $location.path('/panier');
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





            });
getAll();
                });
         }
}]);
