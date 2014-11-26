(function() {
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

})();