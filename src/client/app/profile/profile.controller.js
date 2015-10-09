(function() {
    'use strict';
    
    angular
        .module('app')
        .controller('Profile', Profile);
    
    function Profile($scope) {
        $scope.test = "Hello, Profile Angular Controller!";
    }
    
})();