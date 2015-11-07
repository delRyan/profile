(function() {

  'use strict';

  angular.module('app', ['ui.router', 'ngAnimate'])
    .config(function($locationProvider, $stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('profile', {
          url: '/',
          templateUrl: 'app/profile/profile.html',
          controller: 'Profile',
          controllerAs: 'profile',

          backgroundClass: 'space-background',
          navbarClass: 'navbar-primary'
        })
        .state('skills', {
          url: '/skills',
          templateUrl: 'app/skills/skills.html',

          backgroundClass: 'bar-background',
          navbarClass: 'navbar-secondary'
        })
        .state('network', {
          url: '/network',
          templateUrl: 'app/network/network.html',

          backgroundClass: 'white-background',
          navbarClass: 'navbar-secondary'
        })
        .state('contact', {
          url: '/contact',
          templateUrl: 'app/contact/contact.html',

          backgroundClass: 'white-background',
          navbarClass: 'navbar-secondary'
        });

      $locationProvider.html5Mode(true);
    })

    .run(function($rootScope) {
      $rootScope.$on('$stateChangeSuccess',function(event, toState) {
        $rootScope.backgroundClass = toState.backgroundClass;
        $rootScope.navbarClass = toState.navbarClass;
      });
    });
})();
