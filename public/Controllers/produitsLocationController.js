angular.module('app').controller('produitLocationController', ['$scope', '$location','$routeParams', 'AuthService', '$rootScope','$http'
        , function ($scope, $location, $routeParams,AuthService, $rootScope,$http) {

          $scope.produit={};
          // var id =$routeParams.itemId;
          // // console.log(id);
          // $http.get('/produits/'+id).success(function(data){
          //   $scope.produit = data;});

          $http.get('/produits/location').success(function(data) {
           $scope.locations= data;
          });


          $scope.maxSize = 9;
          $scope.currentPage = 1;
          $scope.totalItems = 0;
          $scope.prix=500;
          $scope.produits = [] ;

          // $scope.reservations=[];
          // $scope.reservation={};
          //
          // var getReservations = function () {
          //   $http.get('/produits/'+id).success(function(data) {
          //    $scope.reservations= data.reservation;
          //       console.log('aa');
          //         console.log($scope.reservations);
          //         console.log('bb');
          //         for (var i = 0; i <   $scope.reservations.length; i++) {
          //            $http.get('/produits/'+$scope.reservations[i]).success(function(data){
          //              $scope.reservation=data;
          //               console.log(data);
          //               console.log('ccc');
          //                $scope.reservations.push($scope.reservation);
          //
          //                console.log('aaaaa');
          //
          //          });
          //
          //              }
          //         console.log('i received the data i requested');
          //     });
          //   };
          //
          // // appel au fonction getReservation()
          // getReservations()

            }]);
