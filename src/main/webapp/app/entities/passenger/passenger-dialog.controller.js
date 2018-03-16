(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('PassengerDialogController', PassengerDialogController);

    PassengerDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Passenger', 'Corporate', 'Booking'];

    function PassengerDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Passenger, Corporate, Booking) {
        var vm = this;

        vm.passenger = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.corporates = Corporate.query();
        vm.bookings = Booking.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.passenger.id !== null) {
                Passenger.update(vm.passenger, onSaveSuccess, onSaveError);
            } else {
                Passenger.save(vm.passenger, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('galileoBookingApp:passengerUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.birthday = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
