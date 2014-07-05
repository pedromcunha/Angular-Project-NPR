app.controller('SearchController', function ($scope, $http, $sce) {//controller for the search query
	$scope.submitSearch = function(genre, id) {//api call for the query/genre
	  var queryText = $scope.searchText;
	  if (genre == undefined) {
	  	var genre = $scope.searchText;
	  	var searchUrl = 'https://gdata.youtube.com/feeds/api/videos?q='+queryText.split(' ').join('+')+'+trailer/MOVIE-TITLE&v=2&max-results=5&hd=true&alt=json&category=Trailer&callback=JSON_CALLBACK';
	  }
	  else {
	  		var searchUrl = 'https://gdata.youtube.com/feeds/api/videos?q='+genre.split(' ').join('+')+'+trailer+/MOVIE-GENRE&v=2&orderby=viewCount&max-results=5&hd=true&alt=json&category='+genre.split(' ').join('+')+'&callback=JSON_CALLBACK';
	  }
	$http({
		method: 'JSONP',
		url: searchUrl
	}).success(function(data, status){
		var videosSrc = [];
		for (var i = 0; i < data.feed.entry.length; i++) {//cleans up the array

			videosSrc.push($sce.trustAsResourceUrl(data.feed.entry[i].content.src));
		}
	$scope.programs = videosSrc;
	}).error(function(data, status){
		console.log('err');
	});
	}
});