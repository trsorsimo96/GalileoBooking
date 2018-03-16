(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .factory('GroupAirlineAllianceSearch', GroupAirlineAllianceSearch);

    GroupAirlineAllianceSearch.$inject = ['$resource'];

    function GroupAirlineAllianceSearch($resource) {
        var resourceUrl =  'api/_search/group-airline-alliances/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
