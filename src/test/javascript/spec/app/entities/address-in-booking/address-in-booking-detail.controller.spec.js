'use strict';

describe('Controller Tests', function() {

    describe('AddressInBooking Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockAddressInBooking, MockCountry, MockBooking;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockAddressInBooking = jasmine.createSpy('MockAddressInBooking');
            MockCountry = jasmine.createSpy('MockCountry');
            MockBooking = jasmine.createSpy('MockBooking');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'AddressInBooking': MockAddressInBooking,
                'Country': MockCountry,
                'Booking': MockBooking
            };
            createController = function() {
                $injector.get('$controller')("AddressInBookingDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'galileoBookingApp:addressInBookingUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
