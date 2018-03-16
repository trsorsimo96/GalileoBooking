(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('GroupAirlineAllianceController', GroupAirlineAllianceController);

    GroupAirlineAllianceController.$inject = ['GroupAirlineAlliance', 'GroupAirlineAllianceSearch'];

    function GroupAirlineAllianceController(GroupAirlineAlliance, GroupAirlineAllianceSearch) {

        var vm = this;

        vm.groupAirlineAlliances = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            GroupAirlineAlliance.query(function(result) {
                vm.groupAirlineAlliances = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            GroupAirlineAllianceSearch.query({query: vm.searchQuery}, function(result) {
                vm.groupAirlineAlliances = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
