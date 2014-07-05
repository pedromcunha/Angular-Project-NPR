var app = angular.module('myApp', []); //creates a new module called myApp
var apiKey = 'AIzaSyDYhqH1guvlxxocuttrwxE2kkvYefu0cqo';
var searchInput;
app.run(['$rootScope', function ($rootScope) {
	$rootScope.genres = [
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
}]);

app.controller('SearchController', function ($scope, $http) {//controller for the query
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});
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
		for (var i = 0; i < data.feed.entry.length; i++) {
			videosSrc.push(data.feed.entry[i].content.src);
			}
	$scope.programs = videosSrc;//cleans up the array
	}).error(function(data, status){
		console.log('err');
	});
	}
});
				