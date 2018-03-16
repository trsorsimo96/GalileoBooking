(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .factory('TownSearch', TownSearch);

    TownSearch.$inject = ['$resource'];

    function TownSearch($resource) {
        var resourceUrl =  'api/_search/towns/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
