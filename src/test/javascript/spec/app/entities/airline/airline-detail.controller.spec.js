'use strict';

describe('Controller Tests', function() {

    describe('Airline Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockAirline, MockGroupAirlineAlliance, MockSegment, MockConfigFees;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockAirline = jasmine.createSpy('MockAirline');
            MockGroupAirlineAlliance = jasmine.createSpy('MockGroupAirlineAlliance');
            MockSegment = jasmine.createSpy('MockSegment');
            MockConfigFees = jasmine.createSpy('MockConfigFees');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Airline': MockAirline,
                'GroupAirlineAlliance': MockGroupAirlineAlliance,
                'Segment': MockSegment,
                'ConfigFees': MockConfigFees
            };
            createController = function() {
                $injector.get('$controller')("AirlineDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'galileoBookingApp:airlineUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
