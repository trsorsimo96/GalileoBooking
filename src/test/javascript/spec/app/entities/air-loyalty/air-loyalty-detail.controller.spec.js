'use strict';

describe('Controller Tests', function() {

    describe('AirLoyalty Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockAirLoyalty, MockPassenger, MockAirline;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockAirLoyalty = jasmine.createSpy('MockAirLoyalty');
            MockPassenger = jasmine.createSpy('MockPassenger');
            MockAirline = jasmine.createSpy('MockAirline');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'AirLoyalty': MockAirLoyalty,
                'Passenger': MockPassenger,
                'Airline': MockAirline
            };
            createController = function() {
                $injector.get('$controller')("AirLoyaltyDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'galileoBookingApp:airLoyaltyUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
