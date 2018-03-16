(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('PassengerDetailController', PassengerDetailController);

    PassengerDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Passenger', 'Corporate', 'Booking'];

    function PassengerDetailController($scope, $rootScope, $stateParams, previousState, entity, Passenger, Corporate, Booking) {
        var vm = this;

        vm.passenger = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('galileoBookingApp:passengerUpdate', function(event, result) {
            vm.passenger = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
