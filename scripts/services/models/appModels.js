app.run(['$rootScope', function ($rootScope) {//genre hash/object
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