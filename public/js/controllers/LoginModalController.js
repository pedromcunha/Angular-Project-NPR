(function() {

var app = angular.module('HeaderControllerModule');

function LoginModalController ($scope, $modalInstance, userFactory, $cookies, $timeout) {
    var vm = this;

    //attach things to the view
    vm.closeModal = closeModal;
    vm.login = login;

    function login () {
    	vm.formSubmitted = true;
    	if(vm.userLogin.$valid) {
    		userFactory.login(vm.username, vm.password)
    			.then(function(response) {
    				if(response) {
	    				if(response.status == 401 || response.status == 404) {
	    					vm.responseMessage = vm.formatMessage(response.data.message, false);
	    				}
	    				else {
	    					vm.responseMessage = vm.formatMessage(response.data.message, true);
                            $cookies.user = response.data.user._id;
                            $timeout(closeModal, 1000);
	    				}
	    			}
    			}, function(error) {
    					vm.responseMessage = vm.formatMessage(error.data.message, false);
				});
    	}
    }

    function closeModal () {
        $modalInstance.close();
    }
}

LoginModalController.prototype.formatMessage = function(message, loggedIn) {
    function Message (resMessage, resLoggedIn) {
    	this.message =  resMessage;
		this.loggedIn = resLoggedIn;
    }

    return new Message(message, loggedIn);
};


//injection phase
LoginModalController.$inject = ['$scope', '$modalInstance', 'userFactory', '$cookies', '$timeout'];

app.controller('LoginModalController', LoginModalController);

})();