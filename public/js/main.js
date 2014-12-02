angular.module('VideoListingModules', ['VideoControllerModule', 'VideoServiceModule', 'VideoStorageFactoryModule']);

var appDependencies = 
    ['templates-main',
    'appFiltersModule',
    'HeaderControllerModule',
    'VideoListingModules',
    'appDirectiveModule',
    'appFactoriesModule',
    'userFactoryModule',
    'ui.router',
    'ngCookies',
    // 'ngAnimate',
    'ui.bootstrap'];

var app = angular.module('trailerParke', appDependencies); //main module
var searchInput; //records a user input


app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: '../public/templates/trailer-listings.html',
                controller: 'VideoListingController as vm'
            });
    }
]);

app.constant('apiKeys', {
    youtubeAPI: 'AIzaSyDYhqH1guvlxxocuttrwxE2kkvYefu0cqo',
    rottenTomatoesAPI: '4cwjthjq2hyxz7amh6jj5p4p'
});

/* TODO 
Replace this with the real server
Also replace the tests with the correct deployed api url */

app.constant('trailerParkeApi', {
    userRegistration: 'https://trailer-parke.herokuapp.com/api/register',
    userLogin: 'https://trailer-parke.herokuapp.com/auth/login'
});
;(function() {
    var app = angular.module('HeaderControllerModule', ['userFactoryModule', 'ngCookies']);

    function headerController ($scope, $modal, apiKeys, rottenTomatoesService, youtubeApiService, sharedVideos, $cookieStore, $cookies, VideoListingService, VideoStorage) {
        //set up the view model (vm)
        var vm = this;

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

        vm.searchSubmitted = false;

        vm.genre = null;

        vm.videoStorage = VideoStorage;

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
        };

    	vm.searchYoutube = function(searchText, maxResults) {
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

    	vm.isActiveGenre = function(genre) {
    		return vm.genre === genre.name;
    	};
    }
    
    //controller injection
    headerController.$inject = ['$scope', '$modal', 'apiKeys', 'rottenTomatoesService', 'youtubeApiService', 'sharedVideos', '$cookieStore', '$cookies', 'VideoListingService', 'VideoStorage'];

    //controller declaration
    app.controller('headerController', headerController);

})();;(function() {
	var app = angular.module('VideoServiceModule', ['youtubeFactoryModule']);

	function VideoListingService (apiKeys, youtubeFactory, $sce) {
		this.queryYoutube = function(searchText, maxResults, factoryName) {
			return youtubeFactory[factoryName](searchText, maxResults)
				.then(function(response) {
					if(response) {
						var trailerCollection = response.data.items;
						var convertedCollection = [];

						_.each(trailerCollection, function(trailer) {
							convertedCollection.push($sce.trustAsResourceUrl('https://www.youtube.com/embed/'+trailer.id.videoId));
						});

						return convertedCollection;
					}
				})
				.catch(function(error) {
					return error;
				});
		};
	}

	VideoListingService.$inject = ['apiKeys', 'youtubeFactory', '$sce'];

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
    	vm.closeModal = closeModal,
    	vm.registerUser = registerUser,
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
        };

        return new Message(message, isRegistered);
    };

    //injection phase
    RegistrationModalController.$inject = ['$scope', '$modalInstance', 'userFactory', '$timeout'];

    app.controller('RegistrationModalController', RegistrationModalController);

})();;(function() {
    var app = angular.module('VideoControllerModule', ['ngCookies']);

    function VideoListingController ($scope, VideoStorage) {
    	var vm = this;


    	vm.trailers = VideoStorage;
    }

    //Inject dependencies into the controller
    VideoListingController.$inject = ['$scope', 'VideoStorage'];

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
    var app = angular.module('userFactoryModule', []);

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
            }
    	};

    	return userApi;
    }

    userFactory.$inject = ['$http', 'trailerParkeApi'];

    app.factory('userFactory', userFactory);

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
	  			if(input instanceof Array) {
					for (var i = 0, l = input.length, o = []; i < l; i++) {
						o.push(input[i][0].toUpperCase() + input[i].slice(1));
					};
					return o;
				}
	  			else
	  				return input[0].toUpperCase() + input.slice(1);
	  	}
	  	app.filter('trusted', function ($sce) {
		    return function(url) {
		    	if(url != undefined) {
			        return $sce.getTrustedResourceUrl(url);
		    	}
		    };
		});  
	});
})();