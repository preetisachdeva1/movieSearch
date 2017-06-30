var APP = APP || {};
// Define the ap urls

APP.endpoints = {
    fetchMovie : "https://www.omdbapi.com/?type=movie&r=json&apikey=d14c028&s=:s&page=:page",
    movieDetail : "https://www.omdbapi.com/?apikey=d14c028&i=:i"
}
