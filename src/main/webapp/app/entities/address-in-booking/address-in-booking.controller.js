(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('AddressInBookingController', AddressInBookingController);

    AddressInBookingController.$inject = ['AddressInBooking', 'AddressInBookingSearch'];

    function AddressInBookingController(AddressInBooking, AddressInBookingSearch) {

        var vm = this;

        vm.addressInBookings = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            AddressInBooking.query(function(result) {
                vm.addressInBookings = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            AddressInBookingSearch.query({query: vm.searchQuery}, function(result) {
                vm.addressInBookings = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
