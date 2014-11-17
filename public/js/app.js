var app = angular.module('trailerParke', ['templates-main',
    'appFiltersModule',
    'appControllerModule',
    'appDirectiveModule',
    'appFactoriesModule',
    'ui.router',
    // 'ngAnimate',
    'ui.bootstrap'
]); //main module
var searchInput; //records a user input


app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: '../public/templates/trailer-listings.html',
                controller: 'videoListingController'
            })
            .state('/register', {
                url: '/register',
                templateUrl: '../public/templates/register.html'
            });
    }
]);

app.constant('apiKeys', {
    youtubeAPI: 'AIzaSyDYhqH1guvlxxocuttrwxE2kkvYefu0cqo',
    rottenTomatoesAPI: '4cwjthjq2hyxz7amh6jj5p4p'
});