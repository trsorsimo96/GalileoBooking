(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('EmailInBookingDetailController', EmailInBookingDetailController);

    EmailInBookingDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'EmailInBooking', 'Booking'];

    function EmailInBookingDetailController($scope, $rootScope, $stateParams, previousState, entity, EmailInBooking, Booking) {
        var vm = this;

        vm.emailInBooking = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('galileoBookingApp:emailInBookingUpdate', function(event, result) {
            vm.emailInBooking = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
