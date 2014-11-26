'use strict';
describe('Controller: RegistrationModalController', function() {
	var scope;
	var modalController;
	var modalInstance;
	var element;
	var $httpBackend;

	beforeEach(function(){
	    module('trailerParke');
	});

	beforeEach( inject(function($controller, $rootScope, userFactory, $http, trailerParkeApi, $compile,  _$httpBackend_) {
		scope = $rootScope.$new();
		$httpBackend = _$httpBackend_;
		// Create the mock modal with spies from jasmine
		modalInstance = {
	        close: jasmine.createSpy('modalInstance.close'),
	        dismiss: jasmine.createSpy('modalInstance.dismiss'),
	        result: {
	          then: jasmine.createSpy('modalInstance.result.then')
	        }
	    };
	    //instantiate the modal controller we need to work with
	    modalController = $controller('RegistrationModalController', {
	        $scope: scope,
	        $modalInstance: modalInstance,
	        userFactory: userFactory
	    });
	    //Mock up our element for testing
	    element = angular.element(
	        '<form name="userRegistrationForm" novalidate>' +
		    	'<input ng-model="username" type="text" placeholder="Enter a username" name="username" required>' +
		    	'<input ng-model="password" type="password" placeholder="Enter a username" name="password" required>' +
		    '</form>'
	    );
	    $compile(element)(scope);
	    scope.$digest();
	    //because of the controllerAs syntax we have to set our new scope to reflect what our controller method expects
	    modalController.userRegistrationForm = scope.userRegistrationForm;
	}));

	describe('Validate and send the registraton form if valid', function(){
		it('Should load up the controller for modal', function(){
			expect(modalController).not.toBeUndefined();
		});
		it('Should flag the form as submitted when the user chooses to submit the form', function(){
			expect(modalController.formSubmitted).toBeFalsy();
			modalController.registerUser();
			expect(modalController.formSubmitted).toBeTruthy();
		});
		it('Should not send the data to the backend if the username and password is missing', function(){
			modalController.registerUser();
			expect(modalController.userRegistrationForm.$valid).toBeFalsy();
		});
		it('Should create a successful response message if the user has been successfully submitted', function(){
			modalController.userRegistrationForm.username.$setViewValue('Unique');
		    modalController.userRegistrationForm.password.$setViewValue('Unique');
		    modalController.username = 'Unique';
		    modalController.password = 'Unique';
			scope.$digest();
			expect(modalController.userRegistrationForm.$valid).toBeTruthy();
			modalController.registerUser();
			$httpBackend.expectPOST('http://localhost:1337/api/register', {username: 'Unique', password: 'Unique'}).respond(
				{
       				message: 'Username has already been taken',
       				user: {}
				}
			);
			$httpBackend.flush();
			expect(modalController.responseMessage.registered).toBeTruthy();
		});
		it('Should create an error response message if the username is taken', function(){
		    modalController.userRegistrationForm.username.$setViewValue('KarmaTest');
		    modalController.userRegistrationForm.password.$setViewValue('KarmaTest');
		    modalController.username = 'KarmaTest';
		    modalController.password = 'KarmaTest';
			scope.$digest();
			expect(modalController.userRegistrationForm.$valid).toBeTruthy();
			modalController.registerUser();
			$httpBackend.expectPOST('http://localhost:1337/api/register', {username: 'KarmaTest', password: 'KarmaTest'}).respond(
				{
       				message: 'Username has already been taken',
       				user: null
				}
			);
			$httpBackend.flush();
			expect(modalController.responseMessage.registered).toBeFalsy();
		});
	});
});