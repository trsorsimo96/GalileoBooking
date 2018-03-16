(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('AirlineDeleteController',AirlineDeleteController);

    AirlineDeleteController.$inject = ['$uibModalInstance', 'entity', 'Airline'];

    function AirlineDeleteController($uibModalInstance, entity, Airline) {
        var vm = this;

        vm.airline = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Airline.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
