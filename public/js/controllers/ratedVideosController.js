(function() {

var app = angular.module('RatedVideosControllerModule', []);

function RatedVideosController ($scope, UserStorage, FormatingRatingService) {
    var vm = this;

    console.log(FormatingRatingService);
    
}


//injection phase
RatedVideosController.$inject = ['$scope', 'UserStorage', 'FormatingRatingService'];

app.controller('RatedVideosController', RatedVideosController);

})();