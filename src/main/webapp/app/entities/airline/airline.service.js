(function() {
    'use strict';
    angular
        .module('galileoBookingApp')
        .factory('Airline', Airline);

    Airline.$inject = ['$resource'];

    function Airline ($resource) {
        var resourceUrl =  'api/airlines/:id';

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
