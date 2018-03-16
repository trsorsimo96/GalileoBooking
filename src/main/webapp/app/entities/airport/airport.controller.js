(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('AirportController', AirportController);

    AirportController.$inject = ['Airport', 'AirportSearch'];

    function AirportController(Airport, AirportSearch) {

        var vm = this;

        vm.airports = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Airport.query(function(result) {
                vm.airports = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            AirportSearch.query({query: vm.searchQuery}, function(result) {
                vm.airports = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
