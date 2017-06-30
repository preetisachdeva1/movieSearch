/*
     Initialize the routing in config function
 */

angular
    .module('app')
    .config(config);

function config($routeProvider,$locationProvider) {
   $routeProvider
        .when('/', {
            templateUrl: 'app/components/home/homeView.html',
            controller: 'homeController',
            controllerAs: 'hm'
        })
        .when('/movie/:id', {
            templateUrl: 'app/components/movieDetail/movieDetailView.html',
            controller: 'movieDetailController',
            controllerAs: 'vm'
        })
        .when('/favorites', {
            templateUrl: 'app/components/favorite/favoriteMoviesView.html',
            controller: 'favoritesController',
            controllerAs: 'fm'
        })
        .otherwise({redirectTo: '/'});
   $locationProvider.html5Mode(false);
}