(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('AirLoyaltyDeleteController',AirLoyaltyDeleteController);

    AirLoyaltyDeleteController.$inject = ['$uibModalInstance', 'entity', 'AirLoyalty'];

    function AirLoyaltyDeleteController($uibModalInstance, entity, AirLoyalty) {
        var vm = this;

        vm.airLoyalty = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            AirLoyalty.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
