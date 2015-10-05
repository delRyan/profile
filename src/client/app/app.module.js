(function() {

    'use strict';

    angular.module('profileApp', ['ngRoute'])
        .config(function($routeProvider) {
            $routeProvider.when('/profile', {
                templateUrl: 'templates/profile.html',
                controller: 'profileController'
            });
            $routeProvider.when('/skills', {
                templateUrl: 'templates/skills.html'
            });
            $routeProvider.when('/network', {
                templateUrl: 'templates/network.html'
            });
            $routeProvider.when('/contact', {
                templateUrl: 'templates/contact.html'
            });
        });
})();
