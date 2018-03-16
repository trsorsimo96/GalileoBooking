(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .factory('PhoneInBookingSearch', PhoneInBookingSearch);

    PhoneInBookingSearch.$inject = ['$resource'];

    function PhoneInBookingSearch($resource) {
        var resourceUrl =  'api/_search/phone-in-bookings/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
