/*jshint expr: true*/
/*jshint -W117 */

describe('profile controller', function() {
    'use strict';

    var controller;

    beforeEach(module('app'));

    beforeEach(inject(function($rootScope, $controller) {
        controller = $controller('Profile', {$scope: $rootScope.$new()});
    }));

    afterEach(function() {
        controller = undefined;
    });

    describe('view model', function() {

        it('should be available', function() {
            expect(controller).to.exist;
        });

        it('should have a populated title property', function() {
            expect(controller.title).to.exist;
        });

        it('should have a populated fullName property', function() {
            expect(controller.fullName).to.exist;
        });
    });
});
