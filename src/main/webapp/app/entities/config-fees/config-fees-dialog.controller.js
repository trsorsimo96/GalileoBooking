(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('ConfigFeesDialogController', ConfigFeesDialogController);

    ConfigFeesDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ConfigFees', 'Agency'];

    function ConfigFeesDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ConfigFees, Agency) {
        var vm = this;

        vm.configFees = entity;
        vm.clear = clear;
        vm.save = save;
        vm.agencies = Agency.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.configFees.id !== null) {
                ConfigFees.update(vm.configFees, onSaveSuccess, onSaveError);
            } else {
                ConfigFees.save(vm.configFees, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('galileoBookingApp:configFeesUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
