var app = angular.module('myApp', ['appFiltersModule', 'appControllerModule', 'appDirectiveModule']); //creates a new module called myApp
var searchInput; //records a user input

app.run(['$rootScope', function ($rootScope){
	$rootScope.youtubeAPI = 'AIzaSyDYhqH1guvlxxocuttrwxE2kkvYefu0cqo';
	$rootScope.rottenTomatoesAPI = '4cwjthjq2hyxz7amh6jj5p4p';
}]);