(function() {
	var app = angular.module('appFiltersModule', []);
		app.filter('capitalize', function() {
	  		return function(input) {
	  			if(input instanceof Array) {
					for (var i = 0, l = input.length, o = []; i < l; i++) {
						o.push(input[i][0].toUpperCase() + input[i].slice(1));
					};
					return o;
				}
	  			else
	  				return input[0].toUpperCase() + input.slice(1);
	  	}  
	});
})();