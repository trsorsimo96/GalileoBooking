(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('PhoneInBookingDialogController', PhoneInBookingDialogController);

    PhoneInBookingDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'PhoneInBooking', 'Booking'];

    function PhoneInBookingDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, PhoneInBooking, Booking) {
        var vm = this;

        vm.phoneInBooking = entity;
        vm.clear = clear;
        vm.save = save;
        vm.bookings = Booking.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.phoneInBooking.id !== null) {
                PhoneInBooking.update(vm.phoneInBooking, onSaveSuccess, onSaveError);
            } else {
                PhoneInBooking.save(vm.phoneInBooking, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('galileoBookingApp:phoneInBookingUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
