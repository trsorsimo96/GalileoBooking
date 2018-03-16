(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('AirlineController', AirlineController);

    AirlineController.$inject = ['DataUtils', 'Airline', 'AirlineSearch'];

    function AirlineController(DataUtils, Airline, AirlineSearch) {

        var vm = this;

        vm.airlines = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Airline.query(function(result) {
                vm.airlines = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            AirlineSearch.query({query: vm.searchQuery}, function(result) {
                vm.airlines = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
