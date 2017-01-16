(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['UserService', '$location', '$rootScope'];
    function AdminController(UserService, $location, $rootScope) {
        var vm = this;
        vm.user = null;
        vm.allUsers = [];
        vm.updateUser = updateUser;
        vm.editUser = editUser;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }
         function updateUser(user) {
            UserService.Update(user)
            .then(function () {
                loadAllUsers();
            });
        }

        function editUser(id){
            UserService.GetById(id)
            .then(function(){
                console.log(id)
               // $location.path('#!/admin');
                 var loggedIn = $rootScope.globals.currentUser;       
        var hash =    $location.path("#!/admin/edit/user/" + id);
        //return hash;
        console.log(hash);
        console.log(loggedIn);
            //if( id && response.success )  
            //{ $location.path('/#!/admin')}   
        //$location.path('/#!/admin');
            });
        }

        // function deleteUser(id) {
        //     UserService.Delete(id)
        //     .then(function () {
        //         loadAllUsers();
        //     });
        // }
    }

})();