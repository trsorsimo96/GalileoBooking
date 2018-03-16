(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('PhoneInBookingDetailController', PhoneInBookingDetailController);

    PhoneInBookingDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'PhoneInBooking', 'Booking'];

    function PhoneInBookingDetailController($scope, $rootScope, $stateParams, previousState, entity, PhoneInBooking, Booking) {
        var vm = this;

        vm.phoneInBooking = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('galileoBookingApp:phoneInBookingUpdate', function(event, result) {
            vm.phoneInBooking = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
