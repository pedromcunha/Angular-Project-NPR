var app = angular.module('myApp', []); //creates a new module called myApp

app.run(['$rootScope', function ($rootScope) {
	$rootScope.name = "Pedro Cunha";
}]);

app.controller('MyController', function($scope){
	$scope.person = {
		name: "Pedro Cunha"
	};
});	

app.controller('PlayerController', ['$scope', function ($scope) {
	$scope.playing = false;
	$scope.audio = document.createElement('audio'); //Creates an HTML element
	$scope.audio.src = 'assets/npr.mp3';
	$scope.play = function() {
		$scope.audio.play();
		$scope.playing = true;
	}
	$scope.stop = function() {
		$scope.audio.pause();
		$scope.playing = false;
	}
	$scope.audio.addEventListener('ended', function() {
		$scope.$apply(function(){
			$scope.stop()
		});
	});
}]);
app.controller('RelatedController', ['$scope', function ($scope) {

}]);			