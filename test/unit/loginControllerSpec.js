'use strict';
describe('Controller: LoginModalController', function() {
	var scope;
	var modalController;
	var modalInstance;
	var element;
	var $httpBackend;
	var $cookies;

	beforeEach(function(){
	    module('trailerParke');
	});

	beforeEach( inject(function($controller, $rootScope, userFactory, $http, trailerParkeApi, $compile,  _$httpBackend_, _$cookies_) {
		scope = $rootScope.$new();
		$httpBackend = _$httpBackend_;
		$cookies = _$cookies_;
		// Create the mock modal with spies from jasmine
		modalInstance = {
	        close: jasmine.createSpy('modalInstance.close'),
	        dismiss: jasmine.createSpy('modalInstance.dismiss'),
	        result: {
	          then: jasmine.createSpy('modalInstance.result.then')
	        }
	    };
	    //instantiate the modal controller we need to work with
	    modalController = $controller('LoginModalController', {
	        $scope: scope,
	        $modalInstance: modalInstance,
	        userFactory: userFactory,
	        $cookies: $cookies
	    });
	    //Mock up our element for testing
	    element = angular.element(
	        '<form name="userLogin" novalidate>' +
		    	'<input ng-model="username" type="text" placeholder="Enter a username" name="username" required>' +
		    	'<input ng-model="password" type="password" placeholder="Enter a username" name="password" required>' +
		    '</form>'
	    );
	    $compile(element)(scope);
	    scope.$digest();
	    //because of the controllerAs syntax we have to set our new scope to reflect what our controller method expects
	    modalController.userLogin = scope.userLogin;
	}));

	describe('Validate and authorize the user to use the application', function(){
		it('Should load up the controller for modal', function(){
			expect(modalController).not.toBeUndefined();
		});
		it('Should not accept an empty fieldset', function() {
			expect(modalController.formSubmitted).toBeFalsy();
			//Given no values but the fields are required
			expect(modalController.userLogin.username.$valid).toBeFalsy();
			expect(modalController.userLogin.password.$valid).toBeFalsy();
			modalController.login();
			scope.$digest();
			expect(modalController.formSubmitted).toBeTruthy();
		});
		it('Should handle a correct username and password match', function() {
			$httpBackend.expectPOST('http://localhost:1337/auth/login', {username: 'Test', password: 'Test'})
				.respond({
       				message: "",
       				user: {
       					_id: 'UNIQUE_ID_HERE'
       				}
				});
			// Put some values in the fields to make them valid
			modalController.userLogin.username.$setViewValue('Test');
		    modalController.userLogin.password.$setViewValue('Test');
		    modalController.username = 'Test';
		    modalController.password = 'Test';
		    expect(modalController.userLogin.$valid).toBeTruthy();
		    //initiate login
		    modalController.login();
		    expect(modalController.formSubmitted).toBeTruthy();
		    $httpBackend.flush();
		    //Check to see if the cookie has been submitted
		    expect($cookies.user).toBe('UNIQUE_ID_HERE');
		});
		it('Should handle a 401 unauthorized, username and password not matching', function() {
			$httpBackend.expectPOST('http://localhost:1337/auth/login', {username: 'Test', password: 'Test'})
				.respond(401, {
       				message: "",
       				user: null
				});
			// Put some values in the fields to make them valid
			modalController.userLogin.username.$setViewValue('Test');
		    modalController.userLogin.password.$setViewValue('Test');
		    modalController.username = 'Test';
		    modalController.password = 'Test';
		    expect(modalController.userLogin.$valid).toBeTruthy();
		    //Initiate the login
		    modalController.login();
		    $httpBackend.flush();
		    //check to see the login state variable
		    expect(modalController.responseMessage.loggedIn).toBeFalsy();
		});
		it('Should handle a 404 not found, username not found', function() {
			$httpBackend.expectPOST('http://localhost:1337/auth/login', {username: 'Test', password: 'Test'})
				.respond(404, {
       				message: "",
       				user: null
				});
			// Put some values in the fields to make them valid
			modalController.userLogin.username.$setViewValue('Test');
		    modalController.userLogin.password.$setViewValue('Test');
		    modalController.username = 'Test';
		    modalController.password = 'Test';
		    expect(modalController.userLogin.$valid).toBeTruthy();
		    //Initiate the login
		    modalController.login();
		    $httpBackend.flush();
		    //check to see the login state variable
		    expect(modalController.responseMessage.loggedIn).toBeFalsy();
		});
	});
});