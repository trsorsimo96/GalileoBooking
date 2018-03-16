(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('PhoneInBookingDeleteController',PhoneInBookingDeleteController);

    PhoneInBookingDeleteController.$inject = ['$uibModalInstance', 'entity', 'PhoneInBooking'];

    function PhoneInBookingDeleteController($uibModalInstance, entity, PhoneInBooking) {
        var vm = this;

        vm.phoneInBooking = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            PhoneInBooking.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
