(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .factory('AddressInBookingSearch', AddressInBookingSearch);

    AddressInBookingSearch.$inject = ['$resource'];

    function AddressInBookingSearch($resource) {
        var resourceUrl =  'api/_search/address-in-bookings/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
