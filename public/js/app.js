var app = angular.module('trailerParke', ['appFiltersModule',
										  'appControllerModule', 
										  'appDirectiveModule',
										  'appFactoriesModule',
										  'ngRoute',
										  'ui.bootstrap']); //main module
var searchInput; //records a user input


app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
        	.when('/', 
	        	{
	        		templateUrl: '../templates/trailer-listings.html',
            		controller: 'searchAutocompController'	
	        	})
            .when('/login', 
            	{
            		templateUrl: '../templates/login.html'
            	});
	}]);

app.constant('apiKeys', {
	youtubeAPI: 'AIzaSyDYhqH1guvlxxocuttrwxE2kkvYefu0cqo',
	rottenTomatoesAPI: '4cwjthjq2hyxz7amh6jj5p4p'
});