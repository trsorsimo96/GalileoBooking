(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('AirLoyaltyDialogController', AirLoyaltyDialogController);

    AirLoyaltyDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'AirLoyalty', 'Passenger', 'Airline'];

    function AirLoyaltyDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, AirLoyalty, Passenger, Airline) {
        var vm = this;

        vm.airLoyalty = entity;
        vm.clear = clear;
        vm.save = save;
        vm.cards = Passenger.query({filter: 'airloyalty-is-null'});
        $q.all([vm.airLoyalty.$promise, vm.cards.$promise]).then(function() {
            if (!vm.airLoyalty.card || !vm.airLoyalty.card.id) {
                return $q.reject();
            }
            return Passenger.get({id : vm.airLoyalty.card.id}).$promise;
        }).then(function(card) {
            vm.cards.push(card);
        });
        vm.airlines = Airline.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.airLoyalty.id !== null) {
                AirLoyalty.update(vm.airLoyalty, onSaveSuccess, onSaveError);
            } else {
                AirLoyalty.save(vm.airLoyalty, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('galileoBookingApp:airLoyaltyUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
