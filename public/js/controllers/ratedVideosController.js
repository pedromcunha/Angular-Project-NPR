(function() {

var app = angular.module('RatedVideosControllerModule', []);

function RatedVideosController ($scope, UserStorage, FormatingRatingService, $cookies) {
    var vm = this;

    vm.userState = UserStorage;

    vm.userState.storeUser($cookies.user).then(function(response) {
        vm.ratedTrailers = FormatingRatingService.formatRatings(vm.userState.user.trailers);
    });
}


//injection phase
RatedVideosController.$inject = ['$scope', 'UserStorage', 'FormatingRatingService', '$cookies'];

app.controller('RatedVideosController', RatedVideosController);

})();