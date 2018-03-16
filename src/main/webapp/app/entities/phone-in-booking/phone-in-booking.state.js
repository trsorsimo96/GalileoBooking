(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('phone-in-booking', {
            parent: 'entity',
            url: '/phone-in-booking',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'galileoBookingApp.phoneInBooking.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/phone-in-booking/phone-in-bookings.html',
                    controller: 'PhoneInBookingController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('phoneInBooking');
                    $translatePartialLoader.addPart('phoneType');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('phone-in-booking-detail', {
            parent: 'phone-in-booking',
            url: '/phone-in-booking/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'galileoBookingApp.phoneInBooking.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/phone-in-booking/phone-in-booking-detail.html',
                    controller: 'PhoneInBookingDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('phoneInBooking');
                    $translatePartialLoader.addPart('phoneType');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'PhoneInBooking', function($stateParams, PhoneInBooking) {
                    return PhoneInBooking.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'phone-in-booking',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('phone-in-booking-detail.edit', {
            parent: 'phone-in-booking-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/phone-in-booking/phone-in-booking-dialog.html',
                    controller: 'PhoneInBookingDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['PhoneInBooking', function(PhoneInBooking) {
                            return PhoneInBooking.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('phone-in-booking.new', {
            parent: 'phone-in-booking',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/phone-in-booking/phone-in-booking-dialog.html',
                    controller: 'PhoneInBookingDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                phoneType: null,
                                number: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('phone-in-booking', null, { reload: 'phone-in-booking' });
                }, function() {
                    $state.go('phone-in-booking');
                });
            }]
        })
        .state('phone-in-booking.edit', {
            parent: 'phone-in-booking',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/phone-in-booking/phone-in-booking-dialog.html',
                    controller: 'PhoneInBookingDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['PhoneInBooking', function(PhoneInBooking) {
                            return PhoneInBooking.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('phone-in-booking', null, { reload: 'phone-in-booking' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('phone-in-booking.delete', {
            parent: 'phone-in-booking',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/phone-in-booking/phone-in-booking-delete-dialog.html',
                    controller: 'PhoneInBookingDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['PhoneInBooking', function(PhoneInBooking) {
                            return PhoneInBooking.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('phone-in-booking', null, { reload: 'phone-in-booking' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
