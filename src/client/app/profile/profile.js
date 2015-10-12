(function() {
    'use strict';

    angular
        .module('app')
        .controller('Profile', Profile);

    Profile.$inject = ['$scope'];

    function Profile($scope) {

        $scope.hello = 'Hello, Profile Controller!';
    }

})();
