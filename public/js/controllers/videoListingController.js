(function() {
    var app = angular.module('VideoControllerModule', ['ngCookies']);

    function VideoListingController ($scope, VideoStorage, UserStorage) {
    	var vm = this;

    	vm.trailers = VideoStorage;
    	vm.userState = UserStorage;
    }

    //Inject dependencies into the controller
    VideoListingController.$inject = ['$scope', 'VideoStorage', 'UserStorage'];

    //register the controller
    app.controller('VideoListingController', VideoListingController);

})();