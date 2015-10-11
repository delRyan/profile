(function() {
    'use strict';
    
    angular
        .module('app')
        .controller('Profile', ['$scope', Profile]);
    
    function Profile($scope) {
        $scope.hello = "Hello, Profile Controller!";
    }
    
})();
