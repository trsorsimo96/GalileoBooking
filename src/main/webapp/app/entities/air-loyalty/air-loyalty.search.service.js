(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .factory('AirLoyaltySearch', AirLoyaltySearch);

    AirLoyaltySearch.$inject = ['$resource'];

    function AirLoyaltySearch($resource) {
        var resourceUrl =  'api/_search/air-loyalties/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
