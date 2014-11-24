(function() {

var app = angular.module('HeaderControllerModule');

function LoginModalController ($scope, $modalInstance, userFactory) {
    var vm = this;

    //attach things to the view
    vm.closeModal = closeModal;
    vm.login = login;

    function login () {
    	vm.formSubmitted = true;
    	if(vm.userLogin.$valid) {
    		userFactory.login(vm.username, vm.password)
    			.then(function(response) {
    				console.log(response);
    			}, function(error) {
					console.log('error');
				});
    	}
    }

    function closeModal () {
        $modalInstance.close();
    }
}

//injection phase
LoginModalController.$inject = ['$scope', '$modalInstance', 'userFactory'];

app.controller('LoginModalController', LoginModalController);

})();