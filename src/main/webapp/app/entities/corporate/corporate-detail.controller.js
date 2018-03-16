(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('CorporateDetailController', CorporateDetailController);

    CorporateDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Corporate'];

    function CorporateDetailController($scope, $rootScope, $stateParams, previousState, entity, Corporate) {
        var vm = this;

        vm.corporate = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('galileoBookingApp:corporateUpdate', function(event, result) {
            vm.corporate = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
