(function() {
    'use strict';
    angular
        .module('galileoBookingApp')
        .factory('GroupAirlineAlliance', GroupAirlineAlliance);

    GroupAirlineAlliance.$inject = ['$resource'];

    function GroupAirlineAlliance ($resource) {
        var resourceUrl =  'api/group-airline-alliances/:id';

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
