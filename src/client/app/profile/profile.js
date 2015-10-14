(function() {
    'use strict';

    angular
        .module('app')
        .controller('Profile', Profile);

    function Profile() {
        var vm = this;

        vm.title = 'Profile Controller';
        vm.fullName = 'Ryan Delaney';
    }

})();
