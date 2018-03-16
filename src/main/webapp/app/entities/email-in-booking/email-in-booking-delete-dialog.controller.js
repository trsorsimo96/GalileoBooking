(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('EmailInBookingDeleteController',EmailInBookingDeleteController);

    EmailInBookingDeleteController.$inject = ['$uibModalInstance', 'entity', 'EmailInBooking'];

    function EmailInBookingDeleteController($uibModalInstance, entity, EmailInBooking) {
        var vm = this;

        vm.emailInBooking = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            EmailInBooking.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
