(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['UserService','$location', 'AuthenticationService', 'FlashService'];
    function LoginController(UserService, $location, AuthenticationService, FlashService) {
        var vm = this;
        var administrator = {"username":'admin', "password":'admin',"email":"admin@admin","firstName":"Admin","lastName":"Admin","user_role":"admin","id":1};
        UserService.Create(administrator);
        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
		
        vm.dataLoading = true;
			 var response;
			
	 UserService.GetByUsername(vm.username)
                   .then(function (user){
			
	   // vm.user = user;
    
		 console.log(user);
        
	
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if(response.success && user.user_role == "admin" ) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/admin');
                } else if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                }else if ( vm.user === null ) {
					
               FlashService.Error(response.message);
                 vm.dataLoading = false;
                } else {
              FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
				
            });// end AuthenticationService.Login
			}); //end  UserService.GetByUsername(vm.username)
        };
    }

})();
