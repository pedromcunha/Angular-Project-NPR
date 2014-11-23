(function() {

var app = angular.module('HeaderControllerModule');

function LoginModalController ($scope, $modalInstance, userFactory) {
    var vm = this;

    //attach things to the view
    vm.closeModal = closeModal;

    function closeModal () {
        $modalInstance.close();
    }
}

//injection phase
LoginModalController.$inject = ['$scope', '$modalInstance', 'userFactory'];

app.controller('LoginModalController', LoginModalController);

})();