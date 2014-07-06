angular.module('appFiltersModule', [])
	app.filter('capitalize', function() {
  		return function(input) {
  			return input[0].toUpperCase() + input.slice(1);
  	}  
});