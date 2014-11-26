var appDependencies = 
    ['templates-main',
    'appFiltersModule',
    'HeaderControllerModule',
    'VideoControllerModule',
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
                controller: 'VideoListingController'
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
    userRegistration: 'http://localhost:1337/api/register',
    userLogin: 'http://localhost:1337/auth/login'
});
;(function() {
    var app = angular.module('HeaderControllerModule', ['userFactoryModule', 'ngCookies']);

    function headerController ($scope, $sce, $modal, apiKeys, rottenTomatoesService, youtubeApiService, sharedVideos, $cookieStore, $cookies) {
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
    }

    //methods of the header controller can be accessed in the VM
    headerController.prototype.autocompleteSearch = function(input) {
        var url = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=" + apiKeys.rottenTomatoesAPI + "&q=" + input.split(' ').join('+') + "&page_limit=5&callback=JSON_CALLBACK",
            autoSuggest = [],
            ratings = [],
            suggestion = '';
        if (input.length > 5) {
            rottenTomatoesService.getRatings(url).success(function(data, status) {
                vm.ShowAutoSuggestions = true;
                var rating, title;
                if (data['movies'].length > 0) {
                    for (var i = 0; i < data['movies'].length; i++) {
                        rating = data['movies'][i]['ratings']['critics_score'];
                        title = data['movies'][i]['title'];
                        if (title != '' && title.length < 33)
                            suggestion = title;
                        else if (title.length > 36)
                            suggestion = title.slice(0, 36) + '...';
                        if (rating != -1 && title.length > 0) {
                            autoSuggest.push({
                                title: suggestion,
                                rating: rating
                            });
                        }
                    }
                    vm.AutoSuggestions = autoSuggest;
                }
            }).error(function(data, status) {
                console.log('err');
            });
        } else {
            vm.AutoSuggestions = '';
            vm.Ratings = '';
        }
    };

    headerController.prototype.submitSearch = function(genre, calledFrom) { //api call for the query/genre
        var queryText = vm.searchText,
            searchUrl;
        if (genre == undefined) {
            var genre = vm.searchText,
                searchUrl = 'https://gdata.youtube.com/feeds/api/videos?q=' + queryText.split(' ').join('+') + '+official+trailer&v=2&max-results=3&alt=json&category=movies&callback=JSON_CALLBACK';
        } else searchUrl = 'https://gdata.youtube.com/feeds/api/videos?q=' + genre.split(' ').join('+') + '+official+trailer+-game&v=2&orderby=relevance&max-results=20&hd=true&alt=json&category=movies&callback=JSON_CALLBACK';
        youtubeApiService.getVideos(searchUrl).success(function(data, status) {
            if (data.feed.entry != undefined) { //checks to see if there is a feed
                var videosSrc = [];
                for (var i = 0, l = data.feed.entry.length; i < l; i++) { //cleans up the array
                    videosSrc.push($sce.trustAsResourceUrl(data.feed.entry[i].link[0].href.replace("watch?v=", "embed/").replace('&feature=youtube_gdata', '')));
                }
                sharedVideos.videos = videosSrc;
                vm.searchText = '';
            } else { //if no feed show error msg
                sharedVideos.videos = '';
            }
        }).error(function(data, status) {
            console.log('err');
        });
    };

    headerController.prototype.selectGenre = function(genre) {
        vm.selected = genre;
    };
    headerController.prototype.genreClass = function(genre) {
        return genre === vm.selected ? 'active' : undefined;
    };

    //controller injection
    headerController.$inject = ['$scope', '$sce', '$modal', 'apiKeys', 'rottenTomatoesService', 'youtubeApiService', 'sharedVideos', '$cookieStore', '$cookies'];

    //controller declaration
    app.controller('headerController', headerController);

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

    function VideoListingController ($scope, sharedVideos) {
    	var vm = this;

    	vm.programs = sharedVideos;
    }

    //Inject dependencies into the controller
    VideoListingController.$inject = ['$scope', 'sharedVideos'];

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