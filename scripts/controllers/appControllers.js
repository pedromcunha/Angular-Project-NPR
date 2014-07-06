angular.module('appControllerModule', [])
	.controller('SearchController', function ($scope, $http, $sce) {//controller for the search query
		$scope.submitSearch = function(genre, id) {//api call for the query/genre
		  var queryText = $scope.searchText;
		  if (genre == undefined) {
		  	var genre = $scope.searchText;
		  	var searchUrl = 'https://gdata.youtube.com/feeds/api/videos?q='+queryText.split(' ').join('+')+'+trailer&v=2&max-results=5&alt=json&category=Trailer&callback=JSON_CALLBACK';
		  }
		  else {
		  		var searchUrl = 'https://gdata.youtube.com/feeds/api/videos?q='+genre.split(' ').join('+')+'+trailer&v=2&orderby=viewCount&max-results=5&hd=true&alt=json&category='+genre.split(' ').join('+')+'&callback=JSON_CALLBACK';
		  }
		$http({
			method: 'JSONP',
			url: searchUrl
		}).success(function(data, status){
			if(data.feed.entry != undefined) {
				var videoFeed = data.feed.entry.length;
				var videosSrc = []; 
				for (var i = 0; i < videoFeed; i++) {//cleans up the array
					videosSrc.push($sce.trustAsResourceUrl(data.feed.entry[i].content.src));
				}
				$scope.programs = videosSrc;
				$scope.noVids = false;
			}
			else {
				console.log('not a feed');
				$scope.noVids = true;
				$scope.programs = '';
			}
		}).error(function(data, status){
			console.log('err');
		});
		}
	})
	.controller('genreController', function($scope){
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
	});