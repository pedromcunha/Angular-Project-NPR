(function() {
    var app = angular.module('HeaderControllerModule', ['UserFactoryModule', 'ngCookies']);

    function headerController ($scope, $modal, apiKeys, rottenTomatoesService, youtubeApiService, sharedVideos, $cookieStore, $cookies, VideoListingService, VideoStorage, UserStorage, $state) {
        //set up the view model (vm)
        var vm = this;

        vm.dropdown = {
		    isopen: false
		};

        vm.genres = [
        	{
           	    name: "horror",
	        }, {
	            name: "sci-fi",
	        }, {
	            name: "drama",
	        }, {
	            name: "comedy",
	        }, {
	            name: "thriller"
	        }, {
	            name: "documentary"
	        }, {
	            name: "animation",
	        }, {
	            name: "action",
	        }, {
	            name: "romance",
	        }, {
	            name: "crime",
	        }, {
	            name: "family",
	        }, {
	            name: "sports",
	        }, {
	            name: "adventure",
	        }, {
	            name: "fantasy"
	        }, {
	            name: "history"
	        }, {
	            name: "mystery",
	        }, {
	            name: "musical"
	        }, {
	            name: "western"
	        }
        ];
        //Sould be placed in the DB in the future, ok for now.

        vm.searchSubmitted = false;

        vm.genre = null;

        vm.videoStorage = VideoStorage;

        $scope.$watch(function() { return $cookies.user; }, function(newValue) {
           	vm.userState = newValue;
           	if(newValue === null || newValue === undefined) {
           		UserStorage.user = null;
           	}
           	else {
	           	UserStorage.storeUser(newValue);
            }
        });

        $scope.$on('$stateChangeSuccess', function() {
        	vm.isNotVideoListing = vm.isNotVideoListingState($state);
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
        };

    	vm.searchYoutube = function(searchText, maxResults) {
    		vm.isNotVideoListing = vm.isNotVideoListingState($state);
    		
    		if(vm.isNotVideoListing === true) {
    			$state.go('/');
    		}
    		
    		vm.searchSubmitted = true;
    		vm.genre = null;
    		if(searchText) {
	    		VideoListingService.queryYoutube(searchText, maxResults, 'getTrailer').then(function(response) {
	    			vm.videoStorage.videos = response;
	    			vm.searchSubmitted = false;
	    		});
	    	}	
    	};

    	vm.searchByGenre = function(genre) {
    		vm.genre = genre;
    		VideoListingService.queryYoutube(genre, 21, 'getTrailersByGenre').then(function(response) {
    			vm.videoStorage.videos = response;
    		});
    	};
    }

    headerController.prototype.isNotVideoListingState = function($state) {
        var returnedVar = $state.current.name === '/rated-trailers' ? true : false;
        return returnedVar;
    };

    
    //controller injection
    headerController.$inject = ['$scope', '$modal', 'apiKeys', 'rottenTomatoesService', 'youtubeApiService', 'sharedVideos', '$cookieStore', '$cookies', 'VideoListingService', 'VideoStorage', 'UserStorage', '$state'];

    //controller declaration
    app.controller('headerController', headerController);

})();