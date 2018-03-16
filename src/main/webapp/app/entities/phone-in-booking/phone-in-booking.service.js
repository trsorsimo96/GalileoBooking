(function() {
    'use strict';
    angular
        .module('galileoBookingApp')
        .factory('PhoneInBooking', PhoneInBooking);

    PhoneInBooking.$inject = ['$resource'];

    function PhoneInBooking ($resource) {
        var resourceUrl =  'api/phone-in-bookings/:id';

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
