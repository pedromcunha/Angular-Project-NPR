(function() {
    var app = angular.module('HeaderControllerModule', ['userFactoryModule', 'ngCookies']);

    function headerController ($scope, $sce, $modal, apiKeys, rottenTomatoesService, youtubeApiService, sharedVideos, $cookieStore, $cookies, VideoListingService) {
        //set up the view model (vm)
        var vm = this;

        vm.genres = [
        	{
            name: "horror",
            id: 10
	        }, {
	            name: "sci-fi",
	            id: 13
	        }, {
	            name: "drama",
	            id: 6
	        }, {
	            name: "comedy",
	            id: 4
	        }, {
	            name: "thriller"
	        }, {
	            name: "documentary"
	        }, {
	            name: "animation",
	            id: 2
	        }, {
	            name: "action",
	            id: 1
	        }, {
	            name: "romance",
	            id: 12
	        }, {
	            name: "crime",
	            id: 5
	        }, {
	            name: "family",
	            id: 8
	        }, {
	            name: "sports",
	            id: 15
	        }, {
	            name: "adventure",
	            id: 1
	        }, {
	            name: "fantasy"
	        }, {
	            name: "history"
	        }, {
	            name: "mystery",
	            id: 11
	        }, {
	            name: "musical"
	        }, {
	            name: "western"
	        }
        ];

        $scope.$watch(function() { return $cookies.user; }, function(newValue) {
           vm.userState = newValue;
        });

        vm.openRegistration = function() {
		    var modalInstance = $modal.open({
	            templateUrl: '../public/templates/register-modal.html',
	            controller: 'RegistrationModalController',
	            controllerAs: 'modal'
	        });
		};

        vm.openLogin = function() {
            var modalInstance = $modal.open({
                templateUrl: '../public/templates/login-modal.html',
                controller: 'LoginModalController',
                controllerAs: 'modal'
            });
        };

        vm.logOut = function() {
            $cookieStore.remove('user');
        }

    	vm.searchYoutube = function(searchText) {
    		VideoListingService.queryYoutube(searchText, 3);
    	};
    }
    
    //controller injection
    headerController.$inject = ['$scope', '$sce', '$modal', 'apiKeys', 'rottenTomatoesService', 'youtubeApiService', 'sharedVideos', '$cookieStore', '$cookies', 'VideoListingService'];

    //controller declaration
    app.controller('headerController', headerController);

})();