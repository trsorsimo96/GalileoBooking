(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('AirportDialogController', AirportDialogController);

    AirportDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Airport', 'Segment', 'Town'];

    function AirportDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Airport, Segment, Town) {
        var vm = this;

        vm.airport = entity;
        vm.clear = clear;
        vm.save = save;
        vm.origins = Segment.query({filter: 'airport-is-null'});
        $q.all([vm.airport.$promise, vm.origins.$promise]).then(function() {
            if (!vm.airport.origin || !vm.airport.origin.id) {
                return $q.reject();
            }
            return Segment.get({id : vm.airport.origin.id}).$promise;
        }).then(function(origin) {
            vm.origins.push(origin);
        });
        vm.destinations = Segment.query({filter: 'airport-is-null'});
        $q.all([vm.airport.$promise, vm.destinations.$promise]).then(function() {
            if (!vm.airport.destination || !vm.airport.destination.id) {
                return $q.reject();
            }
            return Segment.get({id : vm.airport.destination.id}).$promise;
        }).then(function(destination) {
            vm.destinations.push(destination);
        });
        vm.towns = Town.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.airport.id !== null) {
                Airport.update(vm.airport, onSaveSuccess, onSaveError);
            } else {
                Airport.save(vm.airport, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('galileoBookingApp:airportUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
