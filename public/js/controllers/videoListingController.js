(function() {
    var app = angular.module('VideoControllerModule', ['ngCookies']);

    function VideoListingController ($scope, VideoStorage) {
    	var vm = this;


    	vm.trailers = VideoStorage;
    }

    //Inject dependencies into the controller
    VideoListingController.$inject = ['$scope', 'VideoStorage'];

    //register the controller
    app.controller('VideoListingController', VideoListingController);

})();