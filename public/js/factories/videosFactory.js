(function() {
    var app = angular.module('VideoStorageFactoryModule', []);

    function VideoStorage () {
        var data = {};

    	return data;
    }

    // VideoStorage.$inject = [];

    app.factory('VideoStorage', VideoStorage);

})();