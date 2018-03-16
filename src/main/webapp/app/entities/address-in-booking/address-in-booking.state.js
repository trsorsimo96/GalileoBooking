(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('address-in-booking', {
            parent: 'entity',
            url: '/address-in-booking',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'galileoBookingApp.addressInBooking.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/address-in-booking/address-in-bookings.html',
                    controller: 'AddressInBookingController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('addressInBooking');
                    $translatePartialLoader.addPart('typeAddress');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('address-in-booking-detail', {
            parent: 'address-in-booking',
            url: '/address-in-booking/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'galileoBookingApp.addressInBooking.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/address-in-booking/address-in-booking-detail.html',
                    controller: 'AddressInBookingDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('addressInBooking');
                    $translatePartialLoader.addPart('typeAddress');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'AddressInBooking', function($stateParams, AddressInBooking) {
                    return AddressInBooking.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'address-in-booking',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('address-in-booking-detail.edit', {
            parent: 'address-in-booking-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/address-in-booking/address-in-booking-dialog.html',
                    controller: 'AddressInBookingDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['AddressInBooking', function(AddressInBooking) {
                            return AddressInBooking.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('address-in-booking.new', {
            parent: 'address-in-booking',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/address-in-booking/address-in-booking-dialog.html',
                    controller: 'AddressInBookingDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                customerName: null,
                                streetAddress1: null,
                                streetAddress2: null,
                                city: null,
                                state: null,
                                zip: null,
                                typeAddress: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('address-in-booking', null, { reload: 'address-in-booking' });
                }, function() {
                    $state.go('address-in-booking');
                });
            }]
        })
        .state('address-in-booking.edit', {
            parent: 'address-in-booking',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/address-in-booking/address-in-booking-dialog.html',
                    controller: 'AddressInBookingDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['AddressInBooking', function(AddressInBooking) {
                            return AddressInBooking.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('address-in-booking', null, { reload: 'address-in-booking' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('address-in-booking.delete', {
            parent: 'address-in-booking',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/address-in-booking/address-in-booking-delete-dialog.html',
                    controller: 'AddressInBookingDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['AddressInBooking', function(AddressInBooking) {
                            return AddressInBooking.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('address-in-booking', null, { reload: 'address-in-booking' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
