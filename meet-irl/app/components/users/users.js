(function() {
    'use strict';
    
    //Define the component and contrller we loaded 
    angular.module('components.users', [])
    .controller('UsersController', function(Users) {
        var vm = this;

        //Call the all() in Users
        vm.users = Users.all();
    })
    .config(function($stateProvider) {
        $stateProvider
        .state('users', {
            url: '/users',
            templateUrl: 'components/users/users.html',
            controller: 'UsersController as uc'
        });
    });
})();