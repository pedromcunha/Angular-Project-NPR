(function() {
	var app = angular.module('VideoServiceModule', ['youtubeFactoryModule']);

	function VideoListingService (apiKeys, youtubeFactory) {
		this.queryYoutube = function(searchText, maxResults) {
			youtubeFactory.getTrailer(searchText, maxResults).then(function(response) {
				console.log(response);
			}, function(error) {
				console.log(error);
			});
		};
	}

	VideoListingService.$inject = ['apiKeys', 'youtubeFactory'];

	app.service('VideoListingService', VideoListingService);

})();