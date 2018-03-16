(function() {
    'use strict';
    angular
        .module('galileoBookingApp')
        .factory('ConfigFees', ConfigFees);

    ConfigFees.$inject = ['$resource'];

    function ConfigFees ($resource) {
        var resourceUrl =  'api/config-fees/:id';

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
