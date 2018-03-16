'use strict';

describe('Controller Tests', function() {

    describe('Town Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockTown, MockCountry, MockPhoneInBooking;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockTown = jasmine.createSpy('MockTown');
            MockCountry = jasmine.createSpy('MockCountry');
            MockPhoneInBooking = jasmine.createSpy('MockPhoneInBooking');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Town': MockTown,
                'Country': MockCountry,
                'PhoneInBooking': MockPhoneInBooking
            };
            createController = function() {
                $injector.get('$controller')("TownDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'galileoBookingApp:townUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
