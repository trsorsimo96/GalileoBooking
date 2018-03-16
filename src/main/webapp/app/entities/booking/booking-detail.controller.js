(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('BookingDetailController', BookingDetailController);

    BookingDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Booking', 'Agency'];

    function BookingDetailController($scope, $rootScope, $stateParams, previousState, entity, Booking, Agency) {
        var vm = this;

        vm.booking = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('galileoBookingApp:bookingUpdate', function(event, result) {
            vm.booking = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
