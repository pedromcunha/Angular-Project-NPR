(function() {
    var app = angular.module('userFactoryModule', []);

    function userFactory ($http, trailerParkeApi) {
    	var userApi = {
    		registerUser: function(username, password) {
    			return $http.post(trailerParkeApi.userRegistration, {
					username: username,
					password: password
				});
    		},
            login: function (username, password) {
                return $http({
                    method: 'POST',
                    url: trailerParkeApi.userLogin,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    transformRequest: function(obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: {
                        username: username,
                        password: password
                    }
            }
    	};

    	return userApi;
    }

    userFactory.$inject = ['$http', 'trailerParkeApi'];

    app.factory('userFactory', userFactory);

})();