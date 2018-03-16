(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('CurrencyDetailController', CurrencyDetailController);

    CurrencyDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Currency', 'Booking'];

    function CurrencyDetailController($scope, $rootScope, $stateParams, previousState, entity, Currency, Booking) {
        var vm = this;

        vm.currency = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('galileoBookingApp:currencyUpdate', function(event, result) {
            vm.currency = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
