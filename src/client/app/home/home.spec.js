/*jshint expr: true*/
/*jshint -W117 */

describe('home controller', function() {
  'use strict';

  var controller;

  beforeEach(module('app'));

  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function($rootScope, $controller) {
    controller = $controller('Home', {$scope: $rootScope.$new()});
  }));

  afterEach(function() {
    controller = undefined;
  });

  describe('view model', function() {

    it('should be available', function() {
      expect(controller).to.exist;
    });

    it('should have a populated profession property', function() {
      expect(controller.profession).to.exist;
    });

    it('should have a populated fullName property', function() {
      expect(controller.fullName).to.exist;
    });
  });
});
