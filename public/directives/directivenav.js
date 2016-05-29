// angular.module('app').directive('navmenu', function () {
//     return {
//         restrict: 'E'
//         , templateUrl: 'public/pages/nav.html'
//         , controller: ['$route','$scope', '$http', '$rootScope', function ($route,$scope, $http, $rootScope) {
//             $rootScope.islogged = false;
//             $rootScope.isadmin = false;
//             $route.reload();
//             $http.get('/users/session').success(function (response) {
//                 console.log(response);
//                 $scope.user = response;
//                 $http.get('/users/' + $scope.user._id).success(function (user) {
//                     console.log(user);
//                      $rootScope.user.panier.length;
//                     $route.reload();
//                     if (user) {
//                         $rootScope.islogged = true;
//                         $route.reload();
//
//                     }
//                     if (user.isAdmin) {
//                         $rootScope.isadmin = true;
//
//                     }
//
//                 });
//             });
//             $route.reload();
//         }]
//     };
// });
