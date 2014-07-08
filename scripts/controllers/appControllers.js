var controllerModule = angular.module('appControllerModule', []);
	controllerModule.controller('SearchController', function ($scope, $http, $sce) {//controller for the search query
		$scope.submitSearch = function(genre, calledFrom) {//api call for the query/genre
		  var queryText = $scope.searchText;
			  if (genre == undefined) {
			  	var genre = $scope.searchText;
			  	var searchUrl = 'https://gdata.youtube.com/feeds/api/videos?q='+queryText.split(' ').join('+')+'+official+trailer&v=2&max-results=3&alt=json&category=Trailer&callback=JSON_CALLBACK';
			  }
			  else var searchUrl = 'https://gdata.youtube.com/feeds/api/videos?q='+genre.split(' ').join('+')+'+official+trailer&v=2&orderby=relevance&max-results=20&hd=true&alt=json&category='+genre.split(' ').join('+')+'&callback=JSON_CALLBACK';
		$http({
			method: 'JSONP',
			url: searchUrl
		}).success(function(data, status){
				if(data.feed.entry != undefined) {//checks to see if there is a feed
					var videoFeed = data.feed.entry.length;
					var VideosSrc = []; 
						for (var i = 0; i < videoFeed; i++) {//cleans up the array
							VideosSrc.push($sce.trustAsResourceUrl(data.feed.entry[i].link[0].href.replace("watch?v=", "embed/").replace('&feature=youtube_gdata', '')));
						}
					$scope.programs = VideosSrc;
					$scope.searchText = '';
				}
				else {//if no feed show error msg
					$scope.programs = '';
				}
		}).error(function(data, status){
			console.log('err');
		});
		}
	});//SearchController
	controllerModule.controller('genreController', function($scope){//holds the genres and youtube api related ids
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
	});//genreController
	controllerModule.controller('SearchAutocompController', function($scope, $http, $sce){
		$scope.AutocompleteSearch = function (input) {
			if (input.length > 5) {
				var url = "http://suggestqueries.google.com/complete/search?q="+input.split(' ').join('+')+"&client=youtube&ds=yt&callback=JSON_CALLBACK";
				var autoSuggest = [];
				$http({
						method: 'JSONP',
						url: url
						}).success(function(data, status){
							$scope.ShowAutoSuggestions = true;
							for (var i = 0; i < data[1].length; i++) {
								if (data[1][i] != undefined)
									autoSuggest.push(data[1][i][0]);	
								$scope.AutoSuggestions = autoSuggest.slice(5, autoSuggest.length);
							};
						}).error(function(data, status){
							console.log('err');
				});
			}
		}
	});//SearchAutocompController