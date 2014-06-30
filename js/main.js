var app = angular.module('myApp', []); //creates a new module called myApp
var apiKey = 'MDE1MDg5NDU4MDE0MDQwNzEzMTg5NDlkZQ001';
var nprUrl = nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

app.run(['$rootScope', function ($rootScope) {
	$rootScope.name = "Pedro Cunha";
}]);

app.controller('MyController', function($scope){
	$scope.person = { name: "Pedro Cunha" };
	var updateClock = function() {
		$scope.clock = new Date();
	};
	var timer = setInterval(function(){
		$scope.$apply(updateClock);
	}, 1000);
	updateClock();
});	

app.controller('PlayerController', function ($scope, $http) {
	$scope.playing = false;
	$scope.audio = document.createElement('audio'); //Creates an HTML element
	$scope.audio.src = 'assets/npr.mp3';
	$scope.audio.addEventListener('ended', function() {
		$scope.$apply(function(){
			$scope.stop()
		});
	});
	$http({
		method: 'JSONP',
		url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
	}).success(function(data, status){
		$scope.programs = data.list.story;
	}).error(function(data, status){
		console.log('err');
	});
	$scope.play = function(program) {
	  if ($scope.playing) $scope.audio.pause();
	  var url = program.audio[0].format.mp4.$text;
	  audio.src = url;
	  audio.play();
	  // Store the state of the player as playing
	  $scope.playing = true;
	}
	$scope.stop = function() {
		$scope.audio.pause();
		$scope.playing = false;
	}
});
app.controller('RelatedController', ['$scope', function ($scope) {

}]);
				