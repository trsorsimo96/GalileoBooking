(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('EmailInBookingDialogController', EmailInBookingDialogController);

    EmailInBookingDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'EmailInBooking', 'Booking'];

    function EmailInBookingDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, EmailInBooking, Booking) {
        var vm = this;

        vm.emailInBooking = entity;
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
            if (vm.emailInBooking.id !== null) {
                EmailInBooking.update(vm.emailInBooking, onSaveSuccess, onSaveError);
            } else {
                EmailInBooking.save(vm.emailInBooking, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('galileoBookingApp:emailInBookingUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
