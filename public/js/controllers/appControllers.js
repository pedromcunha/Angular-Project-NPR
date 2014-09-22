(function(){
var app = angular.module('appControllerModule', []);
	app.controller('searchController', ['$scope', '$sce', 'youtubeApiService', function ($scope, $sce, youtubeApiService) {//controller for the search query
		$scope.submitSearch = function(genre, calledFrom) {//api call for the query/genre
		  	var queryText = $scope.searchText,
		  	  	searchUrl;
			  if (genre == undefined) {
			  	var genre = $scope.searchText,
			  		searchUrl = 'https://gdata.youtube.com/feeds/api/videos?q='+queryText.split(' ').join('+')+'+official+trailer&v=2&max-results=3&alt=json&category=movies&callback=JSON_CALLBACK';
			  }
			  else searchUrl = 'https://gdata.youtube.com/feeds/api/videos?q='+genre.split(' ').join('+')+'+official+trailer+-game&v=2&orderby=relevance&max-results=20&hd=true&alt=json&category=movies&callback=JSON_CALLBACK';
		  youtubeApiService.getVideos(searchUrl).success(function(data, status){
			if(data.feed.entry != undefined) {//checks to see if there is a feed
				var videosSrc = [];
				for (var i = 0, l = data.feed.entry.length; i < l; i++) {//cleans up the array
					videosSrc.push($sce.trustAsResourceUrl(data.feed.entry[i].link[0].href.replace("watch?v=", "embed/").replace('&feature=youtube_gdata', '')));
				}
				$scope.programs = videosSrc;
				$scope.searchText = '';
			}
			else {//if no feed show error msg
				$scope.programs = '';
			}
			}).error(function(data, status){
				console.log('err');
			});
		}
	}]);//searchController
	app.controller('genreController', ['$scope', function($scope){//holds the genres and youtube api related ids
		$scope.genres = [
			{name: "horror", id: 10}, 
			{name: "sci-fi", id: 13}, 
			{name: "drama", id: 6}, 
			{name: "comedy", id: 4}, 
			{name: "thriller"}, 
			{name: "documentary"}, 
			{name: "animation", id: 2}, 
			{name: "action", id: 1}, 
			{name: "romance", id: 12},
			{name: "crime", id: 5},
			{name: "family", id: 8},
			{name: "sports", id: 15},
			{name: "adventure", id: 1},
			{name: "fantasy"},
			{name: "history"},
			{name: "mystery", id: 11},
			{name: "musical"},
			{name: "western"}
		];
		$scope.select= function(genre) {
       		$scope.selected = genre; 
    	};
	    $scope.genreClass = function(genre) {
	        return genre === $scope.selected ? 'active' : undefined;
	    };
	}]);//genreController
	app.controller('searchAutocompController',['$scope', '$sce', 'apiKeys', 'rottenTomatoesService', function($scope, $sce, apiKeys, rottenTomatoesService){
		$scope.autocompleteSearch = function (input) {
				var url = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=" + apiKeys.rottenTomatoesAPI + "&q="+input.split(' ').join('+')+"&page_limit=5&callback=JSON_CALLBACK",
				 	autoSuggest = [],
				 	ratings = [],
					suggestion = '';
			if (input.length > 5) {
				rottenTomatoesService.getRatings(url).success(function(data, status){
						$scope.ShowAutoSuggestions = true;
						var rating, title;
						if(data['movies'].length > 0) {
							for (var i = 0; i < data['movies'].length; i++) {
									rating = data['movies'][i]['ratings']['critics_score'];
									title = data['movies'][i]['title'];
									if (title != '' && title.length < 33)
										suggestion = title;
									else if (title.length > 36)
										suggestion = title.slice(0, 36) + '...';
									if (rating != -1 && title.length > 0) {
										autoSuggest.push({title: suggestion, rating: rating});
									}
							}
							$scope.AutoSuggestions = autoSuggest;
						}
					}).error(function(data, status){
						console.log('err');
				});
			}
			else 
				$scope.AutoSuggestions = '';
				$scope.Ratings = '';
		}
	}]);//SearchAutocompController
})();