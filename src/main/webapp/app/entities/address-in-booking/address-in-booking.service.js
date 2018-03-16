(function() {
    'use strict';
    angular
        .module('galileoBookingApp')
        .factory('AddressInBooking', AddressInBooking);

    AddressInBooking.$inject = ['$resource'];

    function AddressInBooking ($resource) {
        var resourceUrl =  'api/address-in-bookings/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
