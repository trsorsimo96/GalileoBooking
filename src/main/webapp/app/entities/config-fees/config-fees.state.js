(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('config-fees', {
            parent: 'entity',
            url: '/config-fees',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'galileoBookingApp.configFees.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/config-fees/config-fees.html',
                    controller: 'ConfigFeesController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('configFees');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('config-fees-detail', {
            parent: 'config-fees',
            url: '/config-fees/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'galileoBookingApp.configFees.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/config-fees/config-fees-detail.html',
                    controller: 'ConfigFeesDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('configFees');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'ConfigFees', function($stateParams, ConfigFees) {
                    return ConfigFees.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'config-fees',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('config-fees-detail.edit', {
            parent: 'config-fees-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/config-fees/config-fees-dialog.html',
                    controller: 'ConfigFeesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ConfigFees', function(ConfigFees) {
                            return ConfigFees.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('config-fees.new', {
            parent: 'config-fees',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/config-fees/config-fees-dialog.html',
                    controller: 'ConfigFeesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                fees: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('config-fees', null, { reload: 'config-fees' });
                }, function() {
                    $state.go('config-fees');
                });
            }]
        })
        .state('config-fees.edit', {
            parent: 'config-fees',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/config-fees/config-fees-dialog.html',
                    controller: 'ConfigFeesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ConfigFees', function(ConfigFees) {
                            return ConfigFees.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('config-fees', null, { reload: 'config-fees' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('config-fees.delete', {
            parent: 'config-fees',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/config-fees/config-fees-delete-dialog.html',
                    controller: 'ConfigFeesDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ConfigFees', function(ConfigFees) {
                            return ConfigFees.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('config-fees', null, { reload: 'config-fees' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
