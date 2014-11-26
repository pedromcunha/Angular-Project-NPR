angular.module('VideoListingModules', ['VideoControllerModule', 'VideoServiceModule']);

var appDependencies = 
    ['templates-main',
    'appFiltersModule',
    'HeaderControllerModule',
    'VideoListingModules',
    'appDirectiveModule',
    'appFactoriesModule',
    'userFactoryModule',
    'ui.router',
    'ngCookies',
    // 'ngAnimate',
    'ui.bootstrap'];

var app = angular.module('trailerParke', appDependencies); //main module
var searchInput; //records a user input


app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: '../public/templates/trailer-listings.html',
                controller: 'VideoListingController'
            });
    }
]);

app.constant('apiKeys', {
    youtubeAPI: 'AIzaSyDYhqH1guvlxxocuttrwxE2kkvYefu0cqo',
    rottenTomatoesAPI: '4cwjthjq2hyxz7amh6jj5p4p'
});

/* TODO 
Replace this with the real server
Also replace the tests with the correct deployed api url */

app.constant('trailerParkeApi', {
    userRegistration: 'http://localhost:1337/api/register',
    userLogin: 'http://localhost:1337/auth/login'
});
