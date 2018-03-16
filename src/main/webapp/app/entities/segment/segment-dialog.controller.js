(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('SegmentDialogController', SegmentDialogController);

    SegmentDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Segment'];

    function SegmentDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Segment) {
        var vm = this;

        vm.segment = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.segment.id !== null) {
                Segment.update(vm.segment, onSaveSuccess, onSaveError);
            } else {
                Segment.save(vm.segment, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('galileoBookingApp:segmentUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.date = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
