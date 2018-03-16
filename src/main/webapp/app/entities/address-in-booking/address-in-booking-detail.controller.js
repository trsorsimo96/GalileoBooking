(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('AddressInBookingDetailController', AddressInBookingDetailController);

    AddressInBookingDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'AddressInBooking', 'Country', 'Booking'];

    function AddressInBookingDetailController($scope, $rootScope, $stateParams, previousState, entity, AddressInBooking, Country, Booking) {
        var vm = this;

        vm.addressInBooking = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('galileoBookingApp:addressInBookingUpdate', function(event, result) {
            vm.addressInBooking = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
