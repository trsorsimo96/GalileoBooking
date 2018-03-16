(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('AirLoyaltyController', AirLoyaltyController);

    AirLoyaltyController.$inject = ['AirLoyalty', 'AirLoyaltySearch'];

    function AirLoyaltyController(AirLoyalty, AirLoyaltySearch) {

        var vm = this;

        vm.airLoyalties = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            AirLoyalty.query(function(result) {
                vm.airLoyalties = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            AirLoyaltySearch.query({query: vm.searchQuery}, function(result) {
                vm.airLoyalties = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
