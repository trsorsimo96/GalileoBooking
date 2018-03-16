(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('group-airline-alliance', {
            parent: 'entity',
            url: '/group-airline-alliance',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'galileoBookingApp.groupAirlineAlliance.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/group-airline-alliance/group-airline-alliances.html',
                    controller: 'GroupAirlineAllianceController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('groupAirlineAlliance');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('group-airline-alliance-detail', {
            parent: 'group-airline-alliance',
            url: '/group-airline-alliance/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'galileoBookingApp.groupAirlineAlliance.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/group-airline-alliance/group-airline-alliance-detail.html',
                    controller: 'GroupAirlineAllianceDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('groupAirlineAlliance');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'GroupAirlineAlliance', function($stateParams, GroupAirlineAlliance) {
                    return GroupAirlineAlliance.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'group-airline-alliance',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('group-airline-alliance-detail.edit', {
            parent: 'group-airline-alliance-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/group-airline-alliance/group-airline-alliance-dialog.html',
                    controller: 'GroupAirlineAllianceDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['GroupAirlineAlliance', function(GroupAirlineAlliance) {
                            return GroupAirlineAlliance.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('group-airline-alliance.new', {
            parent: 'group-airline-alliance',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/group-airline-alliance/group-airline-alliance-dialog.html',
                    controller: 'GroupAirlineAllianceDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                code: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('group-airline-alliance', null, { reload: 'group-airline-alliance' });
                }, function() {
                    $state.go('group-airline-alliance');
                });
            }]
        })
        .state('group-airline-alliance.edit', {
            parent: 'group-airline-alliance',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/group-airline-alliance/group-airline-alliance-dialog.html',
                    controller: 'GroupAirlineAllianceDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['GroupAirlineAlliance', function(GroupAirlineAlliance) {
                            return GroupAirlineAlliance.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('group-airline-alliance', null, { reload: 'group-airline-alliance' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('group-airline-alliance.delete', {
            parent: 'group-airline-alliance',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/group-airline-alliance/group-airline-alliance-delete-dialog.html',
                    controller: 'GroupAirlineAllianceDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['GroupAirlineAlliance', function(GroupAirlineAlliance) {
                            return GroupAirlineAlliance.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('group-airline-alliance', null, { reload: 'group-airline-alliance' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
