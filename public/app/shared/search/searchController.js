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