(function() {
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

})();