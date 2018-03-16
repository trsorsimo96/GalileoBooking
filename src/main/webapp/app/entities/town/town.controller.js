(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('TownController', TownController);

    TownController.$inject = ['Town', 'TownSearch'];

    function TownController(Town, TownSearch) {

        var vm = this;

        vm.towns = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Town.query(function(result) {
                vm.towns = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            TownSearch.query({query: vm.searchQuery}, function(result) {
                vm.towns = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
