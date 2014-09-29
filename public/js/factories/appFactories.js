(function(){
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
