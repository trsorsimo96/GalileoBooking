(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('CorporateDeleteController',CorporateDeleteController);

    CorporateDeleteController.$inject = ['$uibModalInstance', 'entity', 'Corporate'];

    function CorporateDeleteController($uibModalInstance, entity, Corporate) {
        var vm = this;

        vm.corporate = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Corporate.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
