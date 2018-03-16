(function() {
    'use strict';
    angular
        .module('galileoBookingApp')
        .factory('Passenger', Passenger);

    Passenger.$inject = ['$resource', 'DateUtils'];

    function Passenger ($resource, DateUtils) {
        var resourceUrl =  'api/passengers/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.birthday = DateUtils.convertLocalDateFromServer(data.birthday);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.birthday = DateUtils.convertLocalDateToServer(copy.birthday);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.birthday = DateUtils.convertLocalDateToServer(copy.birthday);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
