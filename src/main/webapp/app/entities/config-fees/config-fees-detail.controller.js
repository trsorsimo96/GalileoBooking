(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('ConfigFeesDetailController', ConfigFeesDetailController);

    ConfigFeesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'ConfigFees', 'Agency'];

    function ConfigFeesDetailController($scope, $rootScope, $stateParams, previousState, entity, ConfigFees, Agency) {
        var vm = this;

        vm.configFees = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('galileoBookingApp:configFeesUpdate', function(event, result) {
            vm.configFees = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
