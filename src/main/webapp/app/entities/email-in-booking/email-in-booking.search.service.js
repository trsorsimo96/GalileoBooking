(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .factory('EmailInBookingSearch', EmailInBookingSearch);

    EmailInBookingSearch.$inject = ['$resource'];

    function EmailInBookingSearch($resource) {
        var resourceUrl =  'api/_search/email-in-bookings/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
