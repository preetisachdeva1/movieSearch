//Inilialize the factory for get the result of search of movie api
angular
    .module('app')
	.factory('getMovieService', getMovieService);
    
    function getMovieService($resource){
        var factoryData = $resource(APP.endpoints.fetchMovie, {}, {query :{method : "GET", isArray :false}});
        return factoryData;
    };

