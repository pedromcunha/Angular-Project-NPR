(function() {
    var app = angular.module('UserFactoryModule', []);

    function userFactory ($http, trailerParkeApi) {
    	var userApi = {
    		registerUser: function(username, password) {
    			return $http.post(trailerParkeApi.userRegistration, {
					username: username,
					password: password
				});
    		},
            login: function (username, password) {
                return $http.post(trailerParkeApi.userLogin, {
                    username: username,
                    password: password
                });
            },
            getUser: function(userId) {
                return $http.get(trailerParkeApi.userById, {
                    params: {
                        id: userId
                    }
                });
            }
    	};

    	return userApi;
    }

    userFactory.$inject = ['$http', 'trailerParkeApi'];

    app.factory('userFactory', userFactory);

})();