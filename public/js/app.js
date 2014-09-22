var app = angular.module('trailerParke', ['appFiltersModule', 'appControllerModule', 'appDirectiveModule', 'appFactoriesModule']); //main module
var searchInput; //records a user input

app.constant('apiKeys', {
	youtubeAPI: 'AIzaSyDYhqH1guvlxxocuttrwxE2kkvYefu0cqo',
	rottenTomatoesAPI: '4cwjthjq2hyxz7amh6jj5p4p'
});