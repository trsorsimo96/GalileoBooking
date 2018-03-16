(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('air-loyalty', {
            parent: 'entity',
            url: '/air-loyalty',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'galileoBookingApp.airLoyalty.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/air-loyalty/air-loyalties.html',
                    controller: 'AirLoyaltyController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('airLoyalty');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('air-loyalty-detail', {
            parent: 'air-loyalty',
            url: '/air-loyalty/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'galileoBookingApp.airLoyalty.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/air-loyalty/air-loyalty-detail.html',
                    controller: 'AirLoyaltyDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('airLoyalty');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'AirLoyalty', function($stateParams, AirLoyalty) {
                    return AirLoyalty.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'air-loyalty',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('air-loyalty-detail.edit', {
            parent: 'air-loyalty-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/air-loyalty/air-loyalty-dialog.html',
                    controller: 'AirLoyaltyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['AirLoyalty', function(AirLoyalty) {
                            return AirLoyalty.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('air-loyalty.new', {
            parent: 'air-loyalty',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/air-loyalty/air-loyalty-dialog.html',
                    controller: 'AirLoyaltyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                number: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('air-loyalty', null, { reload: 'air-loyalty' });
                }, function() {
                    $state.go('air-loyalty');
                });
            }]
        })
        .state('air-loyalty.edit', {
            parent: 'air-loyalty',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/air-loyalty/air-loyalty-dialog.html',
                    controller: 'AirLoyaltyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['AirLoyalty', function(AirLoyalty) {
                            return AirLoyalty.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('air-loyalty', null, { reload: 'air-loyalty' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('air-loyalty.delete', {
            parent: 'air-loyalty',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/air-loyalty/air-loyalty-delete-dialog.html',
                    controller: 'AirLoyaltyDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['AirLoyalty', function(AirLoyalty) {
                            return AirLoyalty.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('air-loyalty', null, { reload: 'air-loyalty' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
