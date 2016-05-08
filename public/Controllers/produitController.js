angular.module('app').controller('produitController',['$scope', '$http',function($scope,$http){
  var getAll = function () {
      $http.get('/produits').success(function (response) {
          $scope.produits = response;
          console.log('i received the data i requested');
      });
  };
  getAll();
  $scope.maxSize = 9;
  $scope.currentPage = 1;
  $scope.totalItems = 0;
  $scope.prix=500

  $scope.recup = function (id) {
      console.log(id);
      $http.get('/produits/' + id).success(function (response) {
        $scope.produit = response;
        console.log($scope.produit);

      });
    };

  $scope.addProduct = function () {
      console.log($scope.produit);
      console.log('aaaa');
      $http.post('/produits', $scope.produit).success(function (response) {
          console.log(response);
          console.log('bbb');
          getAll();
        $scope.produit.nom="";
        $scope.produit.image="";
        $scope.produit.prix="";
        $scope.produit.quantite="";
        $scope.produit.categorie="";

      });
  };
  $scope.deleteProduct = function (id) {
      console.log(id);
      $http.delete('/produits/' +id).success(function (response) {
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
  //    fonction deselectionner un produit
  $scope.deselect = function () {
      $scope.produit = "";
  }



}]);
// filter pour le slider de prix
angular.module('app').filter('displayMe', function () {
  return function (produits,prix) {
    return _.filter(produits, function (produit) {
        return produit.prix < prix ;
    });
  }
});
// controlleur details produit
angular.module('app').controller('DetailsProduitController', ['$location','$scope', '$http','$routeParams',
    '$rootScope',function($location,$scope, $http, $routeParams,$rootScope){
        var id =$routeParams.itemId;
        // console.log(id);
        $http.get('/produits/'+id).success(function(data){
          $rootScope.produit = data;});
        $scope.quantite=1;
      var getAll = function () {
        $scope.produits = [] ;
        $http.get('/users/session').success(function(response){
              console.log(response);
              $scope.cart = response.panier;
              for (var i = 0; i < $scope.cart.length; i++) {
                 $http.get('/produits/'+$scope.cart[i]).success(function(data){
                     $scope.produits.push(data);
                     console.log($scope.produits);


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
            $rootScope.produits.push(produit._id)
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
            $rootScope.user=response;
            console.log($scope.user);
            $http.delete('/users/'+$rootScope.user._id+'/panier/'+produit._id).success(function(data){
              console.log('delete ok');
                getAll();
                



            });

                });
         }
}]);
