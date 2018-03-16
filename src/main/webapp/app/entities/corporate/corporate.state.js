(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('corporate', {
            parent: 'entity',
            url: '/corporate',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'galileoBookingApp.corporate.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/corporate/corporates.html',
                    controller: 'CorporateController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('corporate');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('corporate-detail', {
            parent: 'corporate',
            url: '/corporate/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'galileoBookingApp.corporate.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/corporate/corporate-detail.html',
                    controller: 'CorporateDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('corporate');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Corporate', function($stateParams, Corporate) {
                    return Corporate.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'corporate',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('corporate-detail.edit', {
            parent: 'corporate-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/corporate/corporate-dialog.html',
                    controller: 'CorporateDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Corporate', function(Corporate) {
                            return Corporate.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('corporate.new', {
            parent: 'corporate',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/corporate/corporate-dialog.html',
                    controller: 'CorporateDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                email: null,
                                address: null,
                                phone: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('corporate', null, { reload: 'corporate' });
                }, function() {
                    $state.go('corporate');
                });
            }]
        })
        .state('corporate.edit', {
            parent: 'corporate',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/corporate/corporate-dialog.html',
                    controller: 'CorporateDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Corporate', function(Corporate) {
                            return Corporate.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('corporate', null, { reload: 'corporate' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('corporate.delete', {
            parent: 'corporate',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/corporate/corporate-delete-dialog.html',
                    controller: 'CorporateDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Corporate', function(Corporate) {
                            return Corporate.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('corporate', null, { reload: 'corporate' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
