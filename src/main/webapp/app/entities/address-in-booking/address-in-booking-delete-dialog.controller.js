(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('AddressInBookingDeleteController',AddressInBookingDeleteController);

    AddressInBookingDeleteController.$inject = ['$uibModalInstance', 'entity', 'AddressInBooking'];

    function AddressInBookingDeleteController($uibModalInstance, entity, AddressInBooking) {
        var vm = this;

        vm.addressInBooking = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            AddressInBooking.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
