(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('ConfigFeesController', ConfigFeesController);

    ConfigFeesController.$inject = ['ConfigFees', 'ConfigFeesSearch'];

    function ConfigFeesController(ConfigFees, ConfigFeesSearch) {

        var vm = this;

        vm.configFees = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            ConfigFees.query(function(result) {
                vm.configFees = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            ConfigFeesSearch.query({query: vm.searchQuery}, function(result) {
                vm.configFees = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
