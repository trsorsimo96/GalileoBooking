(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .factory('ConfigFeesSearch', ConfigFeesSearch);

    ConfigFeesSearch.$inject = ['$resource'];

    function ConfigFeesSearch($resource) {
        var resourceUrl =  'api/_search/config-fees/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
