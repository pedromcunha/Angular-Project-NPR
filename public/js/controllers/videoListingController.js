(function() {
    var app = angular.module('VideoControllerModule', ['ngCookies']);

    function VideoListingController ($scope) {
    	var vm = this;
    }

    //Inject dependencies into the controller
    VideoListingController.$inject = ['$scope'];

    //register the controller
    app.controller('VideoListingController', VideoListingController);

})();