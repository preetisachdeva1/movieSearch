/*
    Creaate the directive for search movie
*/
angular
    .module('app')
	.directive('searchMovie', searchMovieModule);

function searchMovieModule(){
	var directive = {
        templateUrl: 'app/shared/search/searchView.html',
        restrict: 'E',
		controller : searchMovieController,
        controllerAs: 'movie'
    };
    return directive;
}
