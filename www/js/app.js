var viradapp = angular.module("viradapp", ['ionic', 'viradapp.wrappers', 'viradapp.controllers', 'viradapp.services', 'viradapp.config', 'ngStorage', 'ngCordova']);
viradapp.run(function($ionicPlatform, GlobalConfiguration) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins &&
            window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleLightContent();
            StatusBar.overlaysWebView(false);
            StatusBar.styleBlackTranslucent();
            StatusBar.backgroundColorByName('black');
        }
    });
})

viradapp.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {
    //$ionicConfigProvider.scrolling.jsScrolling(false);

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|tel|geo):/);

    $stateProvider
    .state('virada', {
        url: "/virada",
        abstract: true,
        templateUrl: 'templates/menu.html'
        // template: "<ion-nav-view name='template' />",
    })

    .state('virada.programacao', {
        url: '/programacao',
        views: {
            'menu-view': {
                templateUrl: 'templates/programacao.html',
                controller: 'ProgramacaoCtrl'
            },
        }
    })

    .state('virada.minha-virada', {
        url: '/programacao/minha-virada',
        views: {
            'menu-view': {
                templateUrl: 'templates/minha-virada.html',
                controller: 'MinhaViradaCtrl'
            },
        }
    })

    .state('virada.atracao-detail', {
        url: '/programacao/atracao/:atracao',
        views: {
            'menu-view': {
                templateUrl: 'templates/atracao-detail.html',
                controller: 'AtracaoCtrl'
            }
        }
    })

    .state('virada.palco-detail', {
        url: '/programacao/palco/:palco',
        views: {
            'menu-view': {
                templateUrl: 'templates/palco-detail.html',
                controller: 'PalcoCtrl'
            }
        }
    })

    .state('virada.about', {
        url: '/programacao/sobre',
        views: {
            'menu-view': {
                templateUrl: 'templates/about.html',
            }
        }
    })

    .state('virada.social', {
        url: '/virada/social',
        views: {
            'menu-view': {
                templateUrl: 'templates/social.html',
                controller: 'SocialCtrl'
            }
        }
    });

    $urlRouterProvider.otherwise('/virada/programacao');
});

