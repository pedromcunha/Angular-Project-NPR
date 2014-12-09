(function() {
    var app = angular.module('VideoControllerModule', ['ngCookies']);

    function VideoListingController ($scope, VideoStorage, UserStorage, userFactory) {
    	var vm = this;

    	vm.trailers = VideoStorage;
    	vm.userState = UserStorage;

        vm.saveRating = function(trailerUrl, rating) {
            var trailer = {
                url: trailerUrl.$$unwrapTrustedValue(),
                userRating: rating,
                isSaved: false
            };
            vm.saveTrailer(trailer, vm.userState.user._id, userFactory, UserStorage);
        }
    }

    VideoListingController.prototype.saveTrailer = function(trailer, userId, userFactory, UserStorage) {
        userFactory.updateUserTrailers(userId, trailer)
            .then(function(response) {
                UserStorage.cacheUser(response.data.user);
            })
            .catch(function(error) {
                console.log('error');
            });
    };


    //Inject dependencies into the controller
    VideoListingController.$inject = ['$scope', 'VideoStorage', 'UserStorage', 'userFactory'];

    //register the controller
    app.controller('VideoListingController', VideoListingController);

})();