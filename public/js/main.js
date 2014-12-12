angular.module('VideoListingModules', ['VideoControllerModule', 'VideoServiceModule', 'VideoStorageFactoryModule']);
angular.module('UserModules', ['UserStorageFactoryModule', 'UserFactoryModule']);
angular.module('RatingModules', ['FormatingRatingServiceModule', 'RatedVideosControllerModule']);

var appDependencies = 
    ['templates-main',
    'appFiltersModule',
    'HeaderControllerModule',
    'VideoListingModules',
    'appDirectiveModule',
    'UserModules',
    'RatingModules',
    'appFactoriesModule',
    'ui.router',
    'ngCookies',
    // 'ngAnimate',
    'ui.bootstrap'];

var app = angular.module('trailerParke', appDependencies); //main module

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: '../public/templates/trailer-listings.html',
                controller: 'VideoListingController as vm'
            })
            .state('/rated-trailers', {
                url: '/rated-trailers',
                templateUrl: '../public/templates/rated-trailers.html',
                controller: 'RatedVideosController as vm'
            });
    }
]);

app.constant('apiKeys', {
    youtubeAPI: 'AIzaSyDYhqH1guvlxxocuttrwxE2kkvYefu0cqo',
    rottenTomatoesAPI: '4cwjthjq2hyxz7amh6jj5p4p'
});

//node api urls
app.constant('trailerParkeApi', {
    userRegistration: 'http://localhost:1337/api/register',
    userLogin: 'http://localhost:1337/auth/login',
    userById: 'http://localhost:1337/api/user',
    updateUserTrailers: 'http://localhost:1337/api/user/updateTrailers'
});
;(function() {
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

})();;(function() {
	var app = angular.module('FormatingRatingServiceModule', []);

	function FormatingRatingService () {
		this.formatRatings = function(videos) {
			var groupedVideos = _.groupBy(videos, 'userRating');
			return groupedVideos;
		};
	}

	// VideoListingService.$inject = [];

	app.service('FormatingRatingService', FormatingRatingService);

})();;(function() {
	var app = angular.module('VideoServiceModule', ['youtubeFactoryModule']);

	function VideoListingService (apiKeys, youtubeFactory, $sce, UserStorage) {
		this.queryYoutube = function(searchText, maxResults, factoryName) {
			return youtubeFactory[factoryName](searchText, maxResults)
				.then(function(response) {
					if(response) {
						var trailerCollection = response.data.items,
							convertedCollection = [];
						//check if a user is logged in
						if(UserStorage.user) {
							var userTrailers = UserStorage.user.trailers;
						}
						//format the trailers properly
						_.each(trailerCollection, function(trailer) {
							var trailerUrl = 'https://www.youtube.com/embed/'+trailer.id.videoId,
								isSaved = _.findWhere(userTrailers, {url: trailerUrl}),
								trailerObj;
								
							if(!!isSaved) {
								isSaved.url = $sce.trustAsResourceUrl(isSaved.url);
								convertedCollection.push(isSaved);
							}
							else {
								trailerObj = {
									url: $sce.trustAsResourceUrl(trailerUrl)
								};
								convertedCollection.push(trailerObj);
							}
						});
						return convertedCollection;
					}
				})
				.catch(function(error) {
					return error;
				});
		};
	}

	VideoListingService.$inject = ['apiKeys', 'youtubeFactory', '$sce', 'UserStorage'];

	app.service('VideoListingService', VideoListingService);

})();;(function() {

var app = angular.module('HeaderControllerModule');

function LoginModalController ($scope, $modalInstance, userFactory, $cookies, $timeout) {
    var vm = this;

    //attach things to the view
    vm.closeModal = closeModal;
    vm.login = login;

    function login () {
    	vm.formSubmitted = true;
    	if(vm.userLogin.$valid) {
    		userFactory.login(vm.username, vm.password)
    			.then(function(response) {
    				if(response) {
	    				if(response.status == 401 || response.status == 404) {
	    					vm.responseMessage = vm.formatMessage(response.data.message, false);
	    				}
	    				else {
	    					vm.responseMessage = vm.formatMessage(response.data.message, true);
                            $cookies.user = response.data.user._id;
                            $timeout(closeModal, 1000);
	    				}
	    			}
    			}, function(error) {
    					vm.responseMessage = vm.formatMessage(error.data.message, false);
				});
    	}
    }

    function closeModal () {
        $modalInstance.close();
    }
}

LoginModalController.prototype.formatMessage = function(message, loggedIn) {
    function Message (resMessage, resLoggedIn) {
    	this.message =  resMessage;
		this.loggedIn = resLoggedIn;
    }

    return new Message(message, loggedIn);
};


//injection phase
LoginModalController.$inject = ['$scope', '$modalInstance', 'userFactory', '$cookies', '$timeout'];

app.controller('LoginModalController', LoginModalController);

})();;(function(){    
	var app = angular.module('HeaderControllerModule');

    function RegistrationModalController ($scope, $modalInstance, userFactory, $timeout) {
    	var vm = this;

    	//attach things to the view
    	vm.closeModal = closeModal;
    	vm.registerUser = registerUser;
    	vm.formSubmitted = false;

    	function closeModal () {
	    	$modalInstance.close();
	    }

	    function registerUser () {
	    	vm.formSubmitted = true;
	    	if(vm.userRegistrationForm.$valid) {
	    		//send the request
	    		userFactory.registerUser(vm.username, vm.password).then(function(response) {
	    			if(response.data.user === null) {
	    				vm.responseMessage = vm.formatMessage(response.data.message, false);
	    			}
	    			else {
	    				vm.responseMessage = vm.formatMessage(response.data.message, true);
						$timeout(closeModal, 5000);
					}
				}, function(error) {
						vm.responseMessage = formatMessage(response.data.message, false);
				});
	    	}  		
	    }
    }

    //prototype methods
    RegistrationModalController.prototype.formatMessage = function(message, isRegistered) {
        function Message (resMessage, resIsRegistered) {
        	this.message =  resMessage;
			this.registered = resIsRegistered;
        }

        return new Message(message, isRegistered);
    };

    //injection phase
    RegistrationModalController.$inject = ['$scope', '$modalInstance', 'userFactory', '$timeout'];

    app.controller('RegistrationModalController', RegistrationModalController);

})();;(function() {

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

})();;(function() {
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

})();;(function() {
    var app = angular.module('appDirectiveModule', []);
        app.directive('ngEnter', function () {//directive for enter key
            return function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    if(event.which === 13) {
                        scope.$apply(function (){
                            scope.$eval(attrs.ngEnter);
                        });
                        event.preventDefault();
                    }
                });
            };
        });
})();;(function(){
	var app = angular.module('appFactoriesModule', []);
	app.factory('youtubeApiService', ['$http', function($http) {
		var youtubeAPI = {};	
		youtubeAPI.getVideos = function(searchUrl) {
			return $http({
				method: 'JSONP',
				url: searchUrl,
				cache: true
			});
		};//getVideos
		return youtubeAPI;
	}]);
	app.factory('rottenTomatoesService', ['$http', function($http) {
		var rottenTomatoesAPI = {};
		rottenTomatoesAPI.getRatings = function(url) {
			return $http({
				method: 'JSONP',
				url: url,
				cache: true
			});
		};
		return rottenTomatoesAPI;
	}]);

	app.factory('sharedVideos', function() {
		var sharedVideos = {};

		return sharedVideos;
	});

})();
;(function() {
    var app = angular.module('UserFactoryModule', []);

    function userFactory ($http, trailerParkeApi) {
    	var userApi = {
    		registerUser: function(username, password) {
    			return $http.post(trailerParkeApi.userRegistration, {
					username: username,
					password: password
				});
    		},
            login: function (username, password) {
                return $http.post(trailerParkeApi.userLogin, {
                    username: username,
                    password: password
                });
            },
            getUser: function(userId) {
                return $http.get(trailerParkeApi.userById, {
                    params: {
                        id: userId
                    }
                });
            },
            updateUserTrailers: function(userId, trailer) {
                return $http.put(trailerParkeApi.updateUserTrailers, {
                    userId: userId,
                    trailer: {
                        url: trailer.url,
                        userRating: trailer.userRating,
                        isSaved: trailer.isSaved
                    }
                });
            }
    	};

    	return userApi;
    }

    userFactory.$inject = ['$http', 'trailerParkeApi'];

    app.factory('userFactory', userFactory);

})();;(function() {
    var app = angular.module('UserStorageFactoryModule', []);

    function UserStorage (userFactory) {
        var data = {};

        data.storeUser = function(userId) {
        	return userFactory.getUser(userId)
                .then(function(response) {
					if(response) {
						data.user = response.data.user;
					}
				})
				.catch(function(error) {
					return error;
				});
        },
        data.cacheUser = function(user) {
            data.user = user;
        }

    	return data;
    }

    UserStorage.$inject = ['userFactory'];

    app.factory('UserStorage', UserStorage);

})();;(function() {
    var app = angular.module('VideoStorageFactoryModule', []);

    function VideoStorage () {
        var data = {};

    	return data;
    }

    // VideoStorage.$inject = [];

    app.factory('VideoStorage', VideoStorage);

})();;(function() {
    var app = angular.module('youtubeFactoryModule', []);

    function youtubeFactory ($http, trailerParkeApi, apiKeys) {
    	var youtubeAPI = {
            getTrailer: function (searchText, maxResults) {
                return $http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults='+
                            maxResults+
                            '&order=rating&q='+
                            searchText+
                            '+official+trailer&type=video&videoDefinition=high&videoEmbeddable=true&key=' + 
                            apiKeys.youtubeAPI);
            },
            getTrailersByGenre: function(genre, maxResults) {
                var excluded = '+-game+-gameplay';
                if(genre === 'fantasy') {
                    excluded += '+-final';
                }
                return  $http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' +
                            maxResults +
                            '&order=rating&q='+
                            genre +
                            '+official+movie+trailer'+
                            excluded + 
                            '&type=video&videoDefinition=high&key='+
                            apiKeys.youtubeAPI);
            }
    	};

    	return youtubeAPI;
    }

    youtubeFactory.$inject = ['$http', 'trailerParkeApi', 'apiKeys'];

    app.factory('youtubeFactory', youtubeFactory);

})();;(function() {
    var app = angular.module('appFiltersModule', []);
    app.filter('capitalize', function() {
        return function(input) {
            if (input instanceof Array) {
                for (var i = 0, l = input.length, o = []; i < l; i++) {
                    o.push(input[i][0].toUpperCase() + input[i].slice(1));
                }
                return o;
            } else
                return input[0].toUpperCase() + input.slice(1);
        };
    });

    app.filter('trusted', ['$sce', function($sce) {
        return function(url) {
            if (url !== undefined) {
                return $sce.trustAsResourceUrl(url);
            }
        };
    }]);

})();