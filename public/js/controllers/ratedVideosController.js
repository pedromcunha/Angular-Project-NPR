(function() {

var app = angular.module('RatedVideosControllerModule', []);

function RatedVideosController ($scope, UserStorage, FormatingRatingService, $cookies, userFactory) {
    var vm = this;

    vm.userState = UserStorage;

    vm.userState.storeUser($cookies.user).then(function(response) {
        vm.ratedTrailers = FormatingRatingService.formatRatings(vm.userState.user.trailers);
    });

    vm.regroupVideos = function(trailer, currentRating) {
        if(trailer.userRating != currentRating) {
            vm.ratedTrailers = FormatingRatingService.formatRatings(vm.userState.user.trailers);
            vm.saveTrailer(trailer, vm.userState.user._id, userFactory, UserStorage);
        }
    };
}

RatedVideosController.prototype.saveTrailer = function(trailer, userId, userFactory, UserStorage) {
    userFactory.updateUserTrailers(userId, trailer)
        .then(function(response) {
            UserStorage.cacheUser(response.data.user);
        })
        .catch(function(error) {
            console.log('error');
        });
};


//injection phase
RatedVideosController.$inject = ['$scope', 'UserStorage', 'FormatingRatingService', '$cookies', 'userFactory'];

app.controller('RatedVideosController', RatedVideosController);

})();