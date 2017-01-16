(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $location, $rootScope, FlashService) {
        var vm = this;
        //console.log(vm);
       
        vm.register = register;
        vm.save = save;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
        // function save() {
        //    // vm.dataLoading = true;
        //     UserService.Update(vm.user)
        //         .then(function (response) {
        //             if (response.success) {
        //                 FlashService.Success('update successful', true);
        //                 $location.path('/');
        //             } else {
        //                 FlashService.Error(response.message);
        //                 vm.dataLoading = false;
        //             }
        //         });
        // }
    }

})();
