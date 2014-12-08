(function() {
    var app = angular.module('UserStorageFactoryModule', []);

    function UserStorage (userFactory) {
        var data = {};

        data.storeUser = function(userId) {
        	userFactory.getUser(userId).then(function(response) {
					if(response) {
						data.user = response.data.user;
					}
				})
				.catch(function(error) {
					return error;
				});
        },
        data.cacheUser = function(user) {
            data.user = user;
        }

    	return data;
    }

    UserStorage.$inject = ['userFactory'];

    app.factory('UserStorage', UserStorage);

})();