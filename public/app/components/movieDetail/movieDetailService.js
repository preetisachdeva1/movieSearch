//Inilialize the factory for get the detail of selected movie
angular
    .module('app')
	.factory('getMovieDetailService', getMovieDetailService);
    
function getMovieDetailService($resource){
    var factoryData = $resource(APP.endpoints.movieDetail, {}, {query :{method : "GET", isArray :false}});
    return factoryData;
};