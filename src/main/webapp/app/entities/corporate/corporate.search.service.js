(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .factory('CorporateSearch', CorporateSearch);

    CorporateSearch.$inject = ['$resource'];

    function CorporateSearch($resource) {
        var resourceUrl =  'api/_search/corporates/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
