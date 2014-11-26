(function() {
	var app = angular.module('VideoServiceModule', ['youtubeFactoryModule']);

	function VideoListingService (apiKeys, youtubeFactory, $sce) {
		this.queryYoutube = function(searchText, maxResults) {
			return youtubeFactory.getTrailer(searchText, maxResults)
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

})();