(function() {
    'use strict';
    angular
        .module('galileoBookingApp')
        .factory('AirLoyalty', AirLoyalty);

    AirLoyalty.$inject = ['$resource'];

    function AirLoyalty ($resource) {
        var resourceUrl =  'api/air-loyalties/:id';

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
