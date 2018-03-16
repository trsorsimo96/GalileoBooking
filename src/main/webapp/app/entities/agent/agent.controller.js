(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('AgentController', AgentController);

    AgentController.$inject = ['Agent', 'AgentSearch'];

    function AgentController(Agent, AgentSearch) {

        var vm = this;

        vm.agents = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Agent.query(function(result) {
                vm.agents = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            AgentSearch.query({query: vm.searchQuery}, function(result) {
                vm.agents = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
