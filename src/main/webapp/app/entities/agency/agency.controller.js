(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('AgencyController', AgencyController);

    AgencyController.$inject = ['DataUtils', 'Agency', 'AgencySearch'];

    function AgencyController(DataUtils, Agency, AgencySearch) {

        var vm = this;

        vm.agencies = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Agency.query(function(result) {
                vm.agencies = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            AgencySearch.query({query: vm.searchQuery}, function(result) {
                vm.agencies = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
