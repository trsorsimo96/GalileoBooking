(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('AddressInBookingDialogController', AddressInBookingDialogController);

    AddressInBookingDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'AddressInBooking', 'Country', 'Booking'];

    function AddressInBookingDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, AddressInBooking, Country, Booking) {
        var vm = this;

        vm.addressInBooking = entity;
        vm.clear = clear;
        vm.save = save;
        vm.countries = Country.query();
        vm.bookings = Booking.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.addressInBooking.id !== null) {
                AddressInBooking.update(vm.addressInBooking, onSaveSuccess, onSaveError);
            } else {
                AddressInBooking.save(vm.addressInBooking, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('galileoBookingApp:addressInBookingUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
