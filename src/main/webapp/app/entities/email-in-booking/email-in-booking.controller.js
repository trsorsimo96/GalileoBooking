(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('EmailInBookingController', EmailInBookingController);

    EmailInBookingController.$inject = ['EmailInBooking', 'EmailInBookingSearch'];

    function EmailInBookingController(EmailInBooking, EmailInBookingSearch) {

        var vm = this;

        vm.emailInBookings = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            EmailInBooking.query(function(result) {
                vm.emailInBookings = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            EmailInBookingSearch.query({query: vm.searchQuery}, function(result) {
                vm.emailInBookings = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
