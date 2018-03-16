(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('SegmentDetailController', SegmentDetailController);

    SegmentDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Segment'];

    function SegmentDetailController($scope, $rootScope, $stateParams, previousState, entity, Segment) {
        var vm = this;

        vm.segment = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('galileoBookingApp:segmentUpdate', function(event, result) {
            vm.segment = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
