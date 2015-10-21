(function() {

    'use strict';

    angular.module('app', ['ngRoute'])
        .config(function($routeProvider, $locationProvider) {
            $routeProvider.when('/', {
                templateUrl: 'app/profile/profile.html',
                controller: 'Profile',
                controllerAs: 'profile'
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

angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("app/contact/contact.html","<div>Contact info goes here!</div>");
$templateCache.put("app/network/network.html","<div>Network info goes here!</div>");
$templateCache.put("app/profile/profile.html","<div>Profile info goes here!</div><div>{{profile.title}}</div>");
$templateCache.put("app/skills/skills.html","<div>Skills go here!</div>");}]);