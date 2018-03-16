(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('airline', {
            parent: 'entity',
            url: '/airline',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'galileoBookingApp.airline.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/airline/airlines.html',
                    controller: 'AirlineController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('airline');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('airline-detail', {
            parent: 'airline',
            url: '/airline/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'galileoBookingApp.airline.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/airline/airline-detail.html',
                    controller: 'AirlineDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('airline');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Airline', function($stateParams, Airline) {
                    return Airline.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'airline',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('airline-detail.edit', {
            parent: 'airline-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/airline/airline-dialog.html',
                    controller: 'AirlineDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Airline', function(Airline) {
                            return Airline.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('airline.new', {
            parent: 'airline',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/airline/airline-dialog.html',
                    controller: 'AirlineDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                code: null,
                                name: null,
                                description: null,
                                logo: null,
                                logoContentType: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('airline', null, { reload: 'airline' });
                }, function() {
                    $state.go('airline');
                });
            }]
        })
        .state('airline.edit', {
            parent: 'airline',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/airline/airline-dialog.html',
                    controller: 'AirlineDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Airline', function(Airline) {
                            return Airline.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('airline', null, { reload: 'airline' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('airline.delete', {
            parent: 'airline',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/airline/airline-delete-dialog.html',
                    controller: 'AirlineDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Airline', function(Airline) {
                            return Airline.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('airline', null, { reload: 'airline' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
