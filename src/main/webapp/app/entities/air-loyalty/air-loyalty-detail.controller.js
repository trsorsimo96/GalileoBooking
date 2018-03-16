(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('AirLoyaltyDetailController', AirLoyaltyDetailController);

    AirLoyaltyDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'AirLoyalty', 'Passenger', 'Airline'];

    function AirLoyaltyDetailController($scope, $rootScope, $stateParams, previousState, entity, AirLoyalty, Passenger, Airline) {
        var vm = this;

        vm.airLoyalty = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('galileoBookingApp:airLoyaltyUpdate', function(event, result) {
            vm.airLoyalty = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
