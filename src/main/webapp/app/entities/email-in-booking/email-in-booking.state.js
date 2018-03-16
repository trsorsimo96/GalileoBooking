(function() {
    'use strict';

    angular
        .module('galileoBookingApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('email-in-booking', {
            parent: 'entity',
            url: '/email-in-booking',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'galileoBookingApp.emailInBooking.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/email-in-booking/email-in-bookings.html',
                    controller: 'EmailInBookingController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('emailInBooking');
                    $translatePartialLoader.addPart('emailType');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('email-in-booking-detail', {
            parent: 'email-in-booking',
            url: '/email-in-booking/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'galileoBookingApp.emailInBooking.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/email-in-booking/email-in-booking-detail.html',
                    controller: 'EmailInBookingDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('emailInBooking');
                    $translatePartialLoader.addPart('emailType');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'EmailInBooking', function($stateParams, EmailInBooking) {
                    return EmailInBooking.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'email-in-booking',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('email-in-booking-detail.edit', {
            parent: 'email-in-booking-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/email-in-booking/email-in-booking-dialog.html',
                    controller: 'EmailInBookingDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EmailInBooking', function(EmailInBooking) {
                            return EmailInBooking.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('email-in-booking.new', {
            parent: 'email-in-booking',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/email-in-booking/email-in-booking-dialog.html',
                    controller: 'EmailInBookingDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                emailType: null,
                                email: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('email-in-booking', null, { reload: 'email-in-booking' });
                }, function() {
                    $state.go('email-in-booking');
                });
            }]
        })
        .state('email-in-booking.edit', {
            parent: 'email-in-booking',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/email-in-booking/email-in-booking-dialog.html',
                    controller: 'EmailInBookingDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EmailInBooking', function(EmailInBooking) {
                            return EmailInBooking.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('email-in-booking', null, { reload: 'email-in-booking' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('email-in-booking.delete', {
            parent: 'email-in-booking',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/email-in-booking/email-in-booking-delete-dialog.html',
                    controller: 'EmailInBookingDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['EmailInBooking', function(EmailInBooking) {
                            return EmailInBooking.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('email-in-booking', null, { reload: 'email-in-booking' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
