(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('AirlineDialogController', AirlineDialogController);

    AirlineDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Airline', 'GroupAirlineAlliance', 'Segment', 'ConfigFees'];

    function AirlineDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Airline, GroupAirlineAlliance, Segment, ConfigFees) {
        var vm = this;

        vm.airline = entity;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.groupairlinealliances = GroupAirlineAlliance.query();
        vm.segments = Segment.query();
        vm.configfees = ConfigFees.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.airline.id !== null) {
                Airline.update(vm.airline, onSaveSuccess, onSaveError);
            } else {
                Airline.save(vm.airline, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('galileoBookingApp:airlineUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


        vm.setLogo = function ($file, airline) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        airline.logo = base64Data;
                        airline.logoContentType = $file.type;
                    });
                });
            }
        };

    }
})();
