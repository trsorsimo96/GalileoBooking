(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('PhoneInBookingController', PhoneInBookingController);

    PhoneInBookingController.$inject = ['PhoneInBooking', 'PhoneInBookingSearch'];

    function PhoneInBookingController(PhoneInBooking, PhoneInBookingSearch) {

        var vm = this;

        vm.phoneInBookings = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            PhoneInBooking.query(function(result) {
                vm.phoneInBookings = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            PhoneInBookingSearch.query({query: vm.searchQuery}, function(result) {
                vm.phoneInBookings = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
