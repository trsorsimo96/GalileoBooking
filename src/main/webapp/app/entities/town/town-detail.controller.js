(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('TownDetailController', TownDetailController);

    TownDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Town', 'Country', 'PhoneInBooking'];

    function TownDetailController($scope, $rootScope, $stateParams, previousState, entity, Town, Country, PhoneInBooking) {
        var vm = this;

        vm.town = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('galileoBookingApp:townUpdate', function(event, result) {
            vm.town = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
