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