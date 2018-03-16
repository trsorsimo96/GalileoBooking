(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .controller('AgentDetailController', AgentDetailController);

    AgentDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Agent', 'Agency'];

    function AgentDetailController($scope, $rootScope, $stateParams, previousState, entity, Agent, Agency) {
        var vm = this;

        vm.agent = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('galileoBookingApp:agentUpdate', function(event, result) {
            vm.agent = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
