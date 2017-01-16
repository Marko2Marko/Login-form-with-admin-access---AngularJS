(function () {
    'use strict';

    angular
        .module('app')
        .controller('EditAllController', EditAllController);

    EditAllController.$inject = ['UserService', '$location', '$rootScope', '$routeParams'];
    function EditAllController(UserService, $location, $rootScope, $routeParams ) {
        var vm = this;
        var curentUserID = $routeParams.id;
        vm.user = null;
        vm.updateUser = updateUser;

        initController();

        function initController() {
            loadCurrentUser();
        }

        function loadCurrentUser() {
           UserService.GetById(curentUserID)
                .then(function (curentUserID) {
                    vm.user = curentUserID;
                });
        }

         function updateUser(user) {
            UserService.Update(user)
            .then(function () {
                loadAllUsers();
            });
        }

    }

})();