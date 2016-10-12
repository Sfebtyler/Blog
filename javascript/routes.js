angular.module('routes', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
    $routeProvider

    .when('/posts', {
    templateUrl: 'templates/pages/posts/index.html'
    })
    .when('/posts/:id/', {
    templateUrl: 'templates/pages/posts/edit.html'
    })
    .when('/', {
    templateUrl: 'templates/pages/users/login.html'
    })
    .when('/createuser', {
    templateUrl: 'templates/pages/users/create.html'
    })
}]);