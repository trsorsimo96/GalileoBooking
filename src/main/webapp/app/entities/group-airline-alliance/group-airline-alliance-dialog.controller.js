(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('GroupAirlineAllianceDialogController', GroupAirlineAllianceDialogController);

    GroupAirlineAllianceDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'GroupAirlineAlliance'];

    function GroupAirlineAllianceDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, GroupAirlineAlliance) {
        var vm = this;

        vm.groupAirlineAlliance = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.groupAirlineAlliance.id !== null) {
                GroupAirlineAlliance.update(vm.groupAirlineAlliance, onSaveSuccess, onSaveError);
            } else {
                GroupAirlineAlliance.save(vm.groupAirlineAlliance, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('galileoBookingApp:groupAirlineAllianceUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
