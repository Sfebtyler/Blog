app = angular.module('blog')

app.controller('UserController', function($http, myService, $window, $location) {
    var store = this;
    store.$http = $http;
    store.users = [];
    store.myService = myService;


    getPosts = function () {
        store.$http.get('http://127.0.0.1:8000/posts/')
        .then(function(response) {
            store.posts = response.data.results;

        });
    };


    getUsers = function () {
        store.$http.get('http://127.0.0.1:8000/users/').then(function(response) {
            store.users = response.data.results;

        });
    };


    store.createUser = function () {
        if (store.myService.emailcreate && store.myService.usernamecreate && store.myService.passwordcreate) {
            store.$http.post('http://127.0.0.1:8000/users/create_user/', {
                username: store.myService.usernamecreate,
                email: store.myService.emailcreate,
                password: store.myService.passwordcreate,
        });
        store.rerouteToLogin()
        } else {
            return this.myService.createIsValid = true;
        }
    };


    getCurrentUser = function () {
        store.$http.get('http://127.0.0.1:8000/users/current_user/').then(function(response) {
        store.currentUser = response.data
    })
};

    rerouteToPosts = function () {
        $location.path('/posts/')
        $window.location.reload()
    };


    store.rerouteToCreateUser = function() {
        $location.path('/createuser/')
    };


    store.rerouteToLogin = function () {
        $location.path('/')
        $window.location.reload()
    };


    getCurrentUser();


    store.logOut = function() {
        $window.localStorage.removeItem('Token');
        store.rerouteToLogin()
        myService.received = false;
    }


    store.userAuth = function () {

        store.$http.post('http://127.0.0.1:8000/api-token-auth/', {
            username: store.myService.username,
            password: store.myService.password,
            })
                .then(function(response) {
                    token = response.data.token;
                    myService.received = true;
                    console.log("response", response)
                    $window.localStorage.setItem('Token', token);
                    getUsers()
                    getCurrentUser()
                    getPosts()
                    rerouteToPosts()

    });
    };





    });