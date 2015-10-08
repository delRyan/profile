(function() {

    'use strict';

    angular.module('profileApp', ['ngRoute'])
        .config(function($routeProvider, $locationProvider) {
            $routeProvider.when('/', {
                templateUrl: 'app/profile/profile.html',
            });
            $routeProvider.when('/skills', {
                templateUrl: 'app/skills/skills.html',
            });
            $routeProvider.when('/network', {
                templateUrl: 'app/network/network.html',
            });
            $routeProvider.when('/contact', {
                templateUrl: 'app/contact/contact.html',
            });
            $routeProvider.otherwise({redirectTo: '/'});

            $locationProvider.html5Mode(true);
        });
})();
