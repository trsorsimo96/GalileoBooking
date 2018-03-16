(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('BookingDialogController', BookingDialogController);

    BookingDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Booking', 'Agency'];

    function BookingDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Booking, Agency) {
        var vm = this;

        vm.booking = entity;
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
            if (vm.booking.id !== null) {
                Booking.update(vm.booking, onSaveSuccess, onSaveError);
            } else {
                Booking.save(vm.booking, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('galileoBookingApp:bookingUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
