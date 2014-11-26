(function() {
    var app = angular.module('VideoControllerModule', ['ngCookies']);

    function VideoListingController ($scope, sharedVideos) {
    	var vm = this;

    	vm.programs = sharedVideos;
    }

    //Inject dependencies into the controller
    VideoListingController.$inject = ['$scope', 'sharedVideos'];

    //register the controller
    app.controller('VideoListingController', VideoListingController);

})();