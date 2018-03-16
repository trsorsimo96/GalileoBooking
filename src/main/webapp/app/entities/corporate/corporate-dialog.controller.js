(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('CorporateDialogController', CorporateDialogController);

    CorporateDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Corporate'];

    function CorporateDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Corporate) {
        var vm = this;

        vm.corporate = entity;
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
            if (vm.corporate.id !== null) {
                Corporate.update(vm.corporate, onSaveSuccess, onSaveError);
            } else {
                Corporate.save(vm.corporate, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('galileoBookingApp:corporateUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
