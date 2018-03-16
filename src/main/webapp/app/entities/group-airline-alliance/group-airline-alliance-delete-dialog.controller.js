(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('GroupAirlineAllianceDeleteController',GroupAirlineAllianceDeleteController);

    GroupAirlineAllianceDeleteController.$inject = ['$uibModalInstance', 'entity', 'GroupAirlineAlliance'];

    function GroupAirlineAllianceDeleteController($uibModalInstance, entity, GroupAirlineAlliance) {
        var vm = this;

        vm.groupAirlineAlliance = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            GroupAirlineAlliance.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
