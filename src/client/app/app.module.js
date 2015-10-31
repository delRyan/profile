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
          controllerAs: 'profile'
        })
        .state('skills', {
          url: '/skills',
          templateUrl: 'app/skills/skills.html'
        })
        .state('network', {
          url: '/network',
          templateUrl: 'app/network/network.html'
        })
        .state('contact', {
          url: '/contact',
          templateUrl: 'app/contact/contact.html'
        });

      $locationProvider.html5Mode(true);
    });
})();
