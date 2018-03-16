(function() {
    'use strict';
    angular
        .module('galileoBookingApp')
        .factory('Corporate', Corporate);

    Corporate.$inject = ['$resource'];

    function Corporate ($resource) {
        var resourceUrl =  'api/corporates/:id';

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
