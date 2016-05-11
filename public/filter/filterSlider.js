angular.module('app').filter('displayMe', function () {
    return function (produits, prix) {
        return _.filter(produits, function (produit) {
            return produit.prix < prix;
        });
    }
});