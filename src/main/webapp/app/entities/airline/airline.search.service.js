(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .factory('AirlineSearch', AirlineSearch);

    AirlineSearch.$inject = ['$resource'];

    function AirlineSearch($resource) {
        var resourceUrl =  'api/_search/airlines/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
