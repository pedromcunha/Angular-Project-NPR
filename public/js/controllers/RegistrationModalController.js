(function(){    
	var app = angular.module('HeaderControllerModule');

    function RegistrationModalController ($scope, $modalInstance, userFactory, $timeout) {
    	var vm = this;

    	//attach things to the view
    	vm.closeModal = closeModal,
    	vm.registerUser = registerUser,
    	vm.formSubmitted = false;

    	function closeModal () {
	    	$modalInstance.close();
	    }

	    function registerUser () {
	    	vm.formSubmitted = true;
	    	if(vm.userRegistrationForm.$valid) {
	    		//send the request
	    		userFactory.registerUser(vm.username, vm.password).then(function(response) {
	    			if(response.data.user === null) {
	    				vm.responseMessage = vm.formatMessage(response.data.message, false);
	    			}
	    			else {
	    				vm.responseMessage = vm.formatMessage(response.data.message, true);
						$timeout(closeModal, 5000);
					}
				}, function(error) {
						vm.responseMessage = formatMessage(response.data.message, false);
				});
	    	}  		
	    }
    }

    //prototype methods
    RegistrationModalController.prototype.formatMessage = function(message, isRegistered) {
        function Message (resMessage, resIsRegistered) {
        	this.message =  resMessage;
			this.registered = resIsRegistered;
        };

        return new Message(message, isRegistered);
    };

    //injection phase
    RegistrationModalController.$inject = ['$scope', '$modalInstance', 'userFactory', '$timeout'];

    app.controller('RegistrationModalController', RegistrationModalController);

})();