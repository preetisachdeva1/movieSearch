/*
    Initialize the app module for application
*/
angular.module('app', [
            'ngRoute',
            'ngResource',
            "infinite-scroll"
            ]);


    



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
//Create the controller for favorite page

angular
    .module('app')
    .controller('favoritesController', favoritesController);

function favoritesController($location){
    var fm = this;
    fm.deleteFavorite = deleteFavorite;
    fm.favroteMovies = JSON.parse(localStorage.getItem("favItems"));

    // delete the selected movie from favorites
    function deleteFavorite(imdbID){
        for (var i = 0; i < fm.favroteMovies.length; i++){
        if (fm.favroteMovies[i].imdbID === imdbID) { 
            fm.favroteMovies.splice(i, 1);
            localStorage.setItem("favItems",JSON.stringify(fm.favroteMovies)); // set the updated value in localStorage
            $location.path('favorites');
        }}
    }
};
//Create the controller for home page
angular
    .module('app')
    .controller('homeController', homeController);

function homeController($scope){
    console.log("homeController");
};

//Create the controller for movie detail page
angular
    .module('app')
    .controller('movieDetailController', movieDetailController);

function movieDetailController($routeParams,getMovieDetailService,$location){
   
    var vm = this;
    vm.movieDetail = {};
    vm.showMovieDetail = true;
    vm.setFavorite = setFavorite;
    vm.isFavorite = true;
    vm.favItems = [];
    vm.favShow = false;
    
    getMovieDetail();

    function getMovieDetail() {
        // call the getMovieDetail for get the detail of movie page
        getMovieDetailService.get({
            i: $routeParams.id
        }, function(data) {
            vm.showMovieDetail = false;
            vm.movieDetail = data;
            checkFavoriteMovie(); // check movie is favorite or not
        }, function(error){
            console.log("there is error in api");
        });
    }
    // Check the selected movie is favorite or not
    function checkFavoriteMovie(){
        if(JSON.parse(localStorage.getItem('favItems') != null)){
            var found = JSON.parse(localStorage.getItem('favItems')).some(function (el) {
                return el.imdbID === vm.movieDetail.imdbID;
            });
            if(found) vm.favShow = true;
       }
    };
    /*
        Set the selected favorite movie in localStorage
        will show on favorite page
    */
    function setFavorite(detail){
        vm.favItems =[];
        if(vm.favShow){
            $location.path("/favorites");
            return;
        }
        vm.favShow = true;
        vm.favItems = JSON.parse(localStorage.getItem('favItems'));
        if(vm.favItems == null) vm.favItems = [];
        vm.favItems.push(detail);
        // set the value in localStorage
        localStorage.setItem("favItems", JSON.stringify(vm.favItems));
    }
};

//Inilialize the factory for get the detail of selected movie
angular
    .module('app')
	.factory('getMovieDetailService', getMovieDetailService);
    
function getMovieDetailService($resource){
    var factoryData = $resource(APP.endpoints.movieDetail, {}, {query :{method : "GET", isArray :false}});
    return factoryData;
};
//Create the controller for search movie
angular
    .module('app')
    .controller('searchMovieController', searchMovieController);

function searchMovieController(getMovieService){
    
    var movie = this;
    movie.listOfMovie = [];
    movie.searchMovies = movieSearch;
    movie.showLoader = false;
    movie.movieNoFound = false;
    movie.page = 1; 
    movie.totalSizeImg = 0;  
    movie.allResImg = 1;
    movie.checkInKeyword = 0;
    movie.loadMore = loadMore;
    movie.keywordChange;

    function movieSearch(){

        var limit_start = movie.listOfMovie.length;
        movie.movieNoFound = false;
        
        // Blank the array and variables when user type different names
        if((movie.checkInKeyword == 1) && (movie.keywordChange != movie.keyword)){
             console.log("okok");
             movie.page = 1;
             movie.totalSizeImg = 0;
             movie.allResImg = 1;
             movie.listOfMovie = [];
        }
        // call api if search keyword is not blank or undefined
        if(movie.keyword !== '' && movie.keyword != undefined) {
            if ((( movie.totalSizeImg > limit_start) || movie.totalSizeImg == 0 ) && movie.allResImg == 1) {
                 movie.showLoader = true;
                 movie.allResImg = 0;
                 // call the api getMovieService
                getMovieService.get({  
                    s: movie.keyword,
                    page : movie.page
                }, function(data) {
                    movie.allResImg = 1;
                    movie.checkInKeyword = 1;
                    movie.totalSizeImg = data.totalResults; // get the total movies value
                    movie.showLoader = false;
                    movie.keywordChange = movie.keyword;
                    movie.listOfMovie = movie.listOfMovie.concat(data.Search); //concat the toatl results of movies
                     movie.page++;
                    if(data.Error == 'Movie not found!') movie.movieNoFound = true; // show message if matched movie is not found
                }, function(error){
                    movie.listOfMovie =[];
                });
           }
        }
    }
    // Call on scrolling down
    function loadMore(){
        if(movie.keyword !== '' && movie.keyword !== undefined){
            movieSearch();
        }
   }
};
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

//Inilialize the factory for get the result of search of movie api
angular
    .module('app')
	.factory('getMovieService', getMovieService);
    
    function getMovieService($resource){
        var factoryData = $resource(APP.endpoints.fetchMovie, {}, {query :{method : "GET", isArray :false}});
        return factoryData;
    };

