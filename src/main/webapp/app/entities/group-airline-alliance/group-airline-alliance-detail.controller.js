(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('GroupAirlineAllianceDetailController', GroupAirlineAllianceDetailController);

    GroupAirlineAllianceDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'GroupAirlineAlliance'];

    function GroupAirlineAllianceDetailController($scope, $rootScope, $stateParams, previousState, entity, GroupAirlineAlliance) {
        var vm = this;

        vm.groupAirlineAlliance = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('galileoBookingApp:groupAirlineAllianceUpdate', function(event, result) {
            vm.groupAirlineAlliance = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
