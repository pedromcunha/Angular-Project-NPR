'use strict';
describe('Controller: headerController', function() {
	var scope;
	var $modal;
	var $cookies;
	var $cookieStore;
	var headerController;
	var $state;

	beforeEach(function(){
	    module('trailerParke');
	});

	beforeEach( inject(function($controller, $rootScope, _$modal_, _$cookieStore_, _$cookies_, _$state_) {
		scope = $rootScope.$new();
		$modal = _$modal_;
		$cookies = _$cookies_;
		$cookieStore = _$cookieStore_;
		$state = _$state_;

		headerController = $controller('headerController', {
	        $scope: scope,
	        $cookies: $cookies,
	        $modal: $modal,
	        $cookieStore: $cookieStore,
	        $state: $state
	    });

	}));

	describe('Logout button', function(){
		it('Should log the user out if clicked', function(){
			$cookies.user = "UNIQUE_ID_HERE";
			expect($cookies.user).toBe("UNIQUE_ID_HERE");
			//initiate logout
			headerController.logOut();
			expect($cookies.user).toBeFalsy();
		});
	});
});