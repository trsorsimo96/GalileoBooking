(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('agent', {
            parent: 'entity',
            url: '/agent',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'galileoBookingApp.agent.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/agent/agents.html',
                    controller: 'AgentController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('agent');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('agent-detail', {
            parent: 'agent',
            url: '/agent/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'galileoBookingApp.agent.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/agent/agent-detail.html',
                    controller: 'AgentDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('agent');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Agent', function($stateParams, Agent) {
                    return Agent.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'agent',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('agent-detail.edit', {
            parent: 'agent-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/agent/agent-dialog.html',
                    controller: 'AgentDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Agent', function(Agent) {
                            return Agent.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('agent.new', {
            parent: 'agent',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/agent/agent-dialog.html',
                    controller: 'AgentDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                surname: null,
                                email: null,
                                clientId: null,
                                signOnCode: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('agent', null, { reload: 'agent' });
                }, function() {
                    $state.go('agent');
                });
            }]
        })
        .state('agent.edit', {
            parent: 'agent',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/agent/agent-dialog.html',
                    controller: 'AgentDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Agent', function(Agent) {
                            return Agent.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('agent', null, { reload: 'agent' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('agent.delete', {
            parent: 'agent',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/agent/agent-delete-dialog.html',
                    controller: 'AgentDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Agent', function(Agent) {
                            return Agent.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('agent', null, { reload: 'agent' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
