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
