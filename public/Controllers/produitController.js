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



  $scope.addProduct = function () {
      console.log($scope.produit);
      $http.post('/produits', $scope.produit).success(function (response) {
          console.log(response);
          getAll();
        $scope.book.nom="";
        $scope.book.image="";
        $scope.book.prix="";
        $scope.book.quantite="";
        $scope.book.categorie="";

      });
  };
  $scope.deleteBook = function (id) {
      console.log(id);
      $http.delete('/api/books/' +id).success(function (response) {
        getAll();
      })
  };
  // fonction pour mettre a jour un livre
  $scope.update = function (book) {
      console.log($scope.book._id);
      $http.put('/api/books/' + $scope.book._id, $scope.book).success(function (response) {
          getAll();
          $scope.book = "";

      });
  };
  //    fonction deselectionner un livre
  $scope.deselect = function () {
      $scope.book = "";
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
    function($location,$scope, $http, $routeParams){
        var id =$routeParams.itemId;
        console.log(id);
        $http.get('/produits/'+id).success(function(data){
          $scope.produit = data;
      });
// ajouter un produit dans un panier
      $scope.addpanier=function(produit){
        console.log("aaaaaaaa");
        console.log(produit._id);
        $http.get('/users/session').success(function(response){
          console.log(response);
          $http.get('/users/'+response._id+'/panier/'+produit._id).success(function(res){
            console.log(res);
            $scope.produits.push(produit._id)
            $location.path('/panier');

          })
          panier();
        })};

        $scope.quantite=0;
        $scope.produits = [] ;
        // recuperer les produits d'un panier
      var panier=function(){
         $http.get('/users/session').success(function(response){
            for (var i = 0; i < response.panier.length; i++) {
              $http.get('/produits/'+response.panier[i]).success(function(data){
                $scope.produits.push(data);

            });
            }
        })};
        panier();





        $scope.delete= function (produit) {
          $http.get('/users/session').success(function(response){
            $scope.user=response;
            console.log($scope.user);
            $http.delete('/users/'+response._id+'/panier/'+produit._id).success(function(data){
              console.log('delete ok');


            });

                });
         }
}]);
