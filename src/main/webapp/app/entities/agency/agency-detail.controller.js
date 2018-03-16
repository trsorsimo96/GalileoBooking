(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('AgencyDetailController', AgencyDetailController);

    AgencyDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Agency'];

    function AgencyDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Agency) {
        var vm = this;

        vm.agency = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('galileoBookingApp:agencyUpdate', function(event, result) {
            vm.agency = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
