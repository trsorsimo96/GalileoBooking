(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('AirportDetailController', AirportDetailController);

    AirportDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Airport', 'Segment', 'Town'];

    function AirportDetailController($scope, $rootScope, $stateParams, previousState, entity, Airport, Segment, Town) {
        var vm = this;

        vm.airport = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('galileoBookingApp:airportUpdate', function(event, result) {
            vm.airport = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
