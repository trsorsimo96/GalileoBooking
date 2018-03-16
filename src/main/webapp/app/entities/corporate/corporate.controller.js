(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('CorporateController', CorporateController);

    CorporateController.$inject = ['Corporate', 'CorporateSearch'];

    function CorporateController(Corporate, CorporateSearch) {

        var vm = this;

        vm.corporates = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Corporate.query(function(result) {
                vm.corporates = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            CorporateSearch.query({query: vm.searchQuery}, function(result) {
                vm.corporates = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
