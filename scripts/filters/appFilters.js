var filterModule = angular.module('appFiltersModule', []);
	filterModule.filter('capitalize', function() {
  		return function(input) {
  			return input[0].toUpperCase() + input.slice(1);
  	}  
});