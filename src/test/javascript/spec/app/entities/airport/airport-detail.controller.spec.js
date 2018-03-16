'use strict';

describe('Controller Tests', function() {

    describe('Airport Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockAirport, MockSegment, MockTown;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockAirport = jasmine.createSpy('MockAirport');
            MockSegment = jasmine.createSpy('MockSegment');
            MockTown = jasmine.createSpy('MockTown');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Airport': MockAirport,
                'Segment': MockSegment,
                'Town': MockTown
            };
            createController = function() {
                $injector.get('$controller')("AirportDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'galileoBookingApp:airportUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
