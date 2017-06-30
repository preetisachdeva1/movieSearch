//Create the controller for home page
angular
    .module('app')
    .controller('homeController', homeController);

function homeController($scope){
    console.log("homeController");
};