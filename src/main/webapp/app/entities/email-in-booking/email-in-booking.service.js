(function() {
    'use strict';
    angular
        .module('galileoBookingApp')
        .factory('EmailInBooking', EmailInBooking);

    EmailInBooking.$inject = ['$resource'];

    function EmailInBooking ($resource) {
        var resourceUrl =  'api/email-in-bookings/:id';

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
