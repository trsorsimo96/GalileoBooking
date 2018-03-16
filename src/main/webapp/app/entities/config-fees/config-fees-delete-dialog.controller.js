(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('ConfigFeesDeleteController',ConfigFeesDeleteController);

    ConfigFeesDeleteController.$inject = ['$uibModalInstance', 'entity', 'ConfigFees'];

    function ConfigFeesDeleteController($uibModalInstance, entity, ConfigFees) {
        var vm = this;

        vm.configFees = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            ConfigFees.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
