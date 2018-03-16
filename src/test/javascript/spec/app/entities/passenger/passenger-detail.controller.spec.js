'use strict';

describe('Controller Tests', function() {

    describe('Passenger Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockPassenger, MockCorporate, MockBooking;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockPassenger = jasmine.createSpy('MockPassenger');
            MockCorporate = jasmine.createSpy('MockCorporate');
            MockBooking = jasmine.createSpy('MockBooking');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Passenger': MockPassenger,
                'Corporate': MockCorporate,
                'Booking': MockBooking
            };
            createController = function() {
                $injector.get('$controller')("PassengerDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'galileoBookingApp:passengerUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
