angular.module('app').controller('produitLocationController', ['$scope', '$location','$routeParams', 'AuthService', '$rootScope','$http'
        , function ($scope, $location, $routeParams,AuthService, $rootScope,$http) {

          $scope.produit={};
          var id =$routeParams.itemId;
          // console.log(id);
          $http.get('/produits/'+id).success(function(data){
            $scope.produit = data;});

          $http.get('/produits/location').success(function(data) {
           $scope.locations= data;
          });


          $scope.maxSize = 9;
          $scope.currentPage = 1;
          $scope.totalItems = 0;
          $scope.prix=500;
          $scope.produits = [] ;



          var getReservations = function () {



              $http.get('/produits/'+$scope.produit._id+'/reservation').success(function(data){
                console.log(data);
                console.log('aa');
                  $scope.reservations = data[0];
                  console.log($scope.reservations);
                  console.log('bb');
                  for (var i = 0; i <   $scope.reservations.length; i++) {
                     $http.get('/produits/'+$scope.reservations[i]).success(function(data){

                        console.log(data);
                        console.log('ccc');
                         $scope.reservations.push(data);

                         console.log('aaaaa');

                   });

                       }
                  console.log('i received the data i requested');
              });
            };

          // appel au fonction getReservation()
          getReservations()

            }]);
