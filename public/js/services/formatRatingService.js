(function() {
	var app = angular.module('FormatingRatingServiceModule', []);

	function FormatingRatingService () {
		this.formatRatings = function(videos) {
			var groupedVideos = _.groupBy(videos, 'userRating');
			return groupedVideos;
		};
	}

	// VideoListingService.$inject = [];

	app.service('FormatingRatingService', FormatingRatingService);

})();