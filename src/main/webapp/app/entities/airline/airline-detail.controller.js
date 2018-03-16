(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('AirlineDetailController', AirlineDetailController);

    AirlineDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Airline', 'GroupAirlineAlliance', 'Segment', 'ConfigFees'];

    function AirlineDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Airline, GroupAirlineAlliance, Segment, ConfigFees) {
        var vm = this;

        vm.airline = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('galileoBookingApp:airlineUpdate', function(event, result) {
            vm.airline = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
