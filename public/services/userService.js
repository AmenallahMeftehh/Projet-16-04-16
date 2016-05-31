//Set an angular Service for handling authentication

angular.module('app').factory('AuthService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {

        // create user variable
        var user = null;
        // return available functions for use in the controllers
        return ({
            isAdmin: isAdmin
            , isLoggedIn: isLoggedIn
            , getUserStatus: getUserStatus
            , login: login
            , logout: logout
            , register: register
        });

        //fonction pour verifier est ce que l'utilisateur est authentifié ou pas
        function isLoggedIn() {
            if (user) {
                return true;
            } else {
                return false;
            }
        }
        //fonction pour verifier est ce que l'utilisateur est admin ou pas

        function isAdmin(user) {
            if (user.role === "admin") {
                return true;
            } else {
                return false;
            }
        }

        //fonction pour verifier les status de l'utilisateur true ou false
        function getUserStatus() {
            return $http.get('/users/status')
                // handle success
                .success(function (data) {
                    if (data.status) {
                        user = true;

                    } else {
                        user = false;
                    }
                })
                // handle error
                .error(function (data) {
                    user = false;
                });
        }
        //fonction login
        function login(username, password) {

            // create a new instance of deferred
            var deferred = $q.defer();

            // send a post request to the server
            $http.post('/users/login', {
                    username: username
                    , password: password
                })
                // handle success
                .success(function (data, status) {
                    if (status === 200 && data.status) {
                        user = true;
                        deferred.resolve();
                    } else {
                        user = false;
                        deferred.reject();
                    }
                })
                // handle error
                .error(function (data) {
                    user = false;
                    deferred.reject();
                });

            // return promise object
            return deferred.promise;

        }
        //fonction logout
        function logout() {

            // création d'une nouvelle instance de deferred
            var deferred = $q.defer();

            // envoie une post request au serveur
            $http.get('/users/logout')
                // en cas de success
                .success(function (data) {
                    user = false;
                    deferred.resolve();
                })
                // en cas d'echec
                .error(function (data) {
                    user = false;
                    deferred.reject();
                });
            // retourne l'objet promise
            return deferred.promise;
        }

        function register(firstname, lastname, username, password, photo) {

            // create a new instance of deferred
            var deferred = $q.defer();

            // send a post request to the server
            $http.post('/users/register', {
                    firstname: firstname
                    , lastname: lastname
                    , username: username
                    , password: password
                    , photo: photo
                })
                // handle success
                .success(function (data, status) {
                    if (status === 200 && data.status) {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                })
                // handle error
                .error(function (data) {
                    deferred.reject();
                });

            // return promise object
            return deferred.promise;

        }
        //recuperer l'utilisateur connecté
        function getUser() {
            return user;
        }
        }]);