(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('SegmentDeleteController',SegmentDeleteController);

    SegmentDeleteController.$inject = ['$uibModalInstance', 'entity', 'Segment'];

    function SegmentDeleteController($uibModalInstance, entity, Segment) {
        var vm = this;

        vm.segment = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Segment.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
