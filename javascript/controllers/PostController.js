app = angular.module('blog')




app.controller('PostController', function($http, myService, $scope, $window, $location, imageUpload) {

    var store = this;
    store.$http = $http;
    store.myService = myService;
    store.posts = [];
    store.currentUser = '';
    store.myService.posttext = $window.localStorage.getItem('text')
    store.myService.postId = $window.localStorage.getItem('id')
    store.myService.Image = {};
    store.createPostText = '';
    store.myService.response = {};


    getPosts = function () {
        store.$http.get('http://127.0.0.1:8000/posts/')
        .then(function(response) {
                store.posts = response.data;
                        if (store.posts.length == 0) {
                            store.myService.noPosts = true;
                        }else{
                            store.myService.noPosts = false;
                        }

        })

    };


    getImage = function () {

        store.$http.get('http://127.0.0.1:8000/posts/' + store.myService.postId + '/')
            .then(function(response) {
                store.myService.Image = response.data.postimage
            })
    };

    store.rerouteToEdit = function (postId, posttext) {
        $window.localStorage.setItem('text', posttext)
        $window.localStorage.setItem('id', postId)

        $location.path('/posts/' + postId + '/')
        getImage()
    };

    store.rerouteToPosts = function () {
        $location.path('/posts/')
    };


    getCurrentUser = function () {
        store.$http.get('http://127.0.0.1:8000/users/current_user/').then(function(response) {
            store.currentUser = response.data
    })
    };
    getCurrentUser()


    store.deletePost = function(postId) {

        console.log("delete post", this)
        store.$http.delete('http://127.0.0.1:8000/posts/' + postId + '/')
        .then(function(response) {
            getPosts();

        });
    };



    store.editPost = function(postId) {
        store.$http.put('http://127.0.0.1:8000/posts/' + store.myService.postId + '/', {posttext: store.myService.posttext})
        .then(function(response) {
            store.rerouteToPosts()
        });
    };


    store.createPost = function(input, postId) {

        store.$http.post('http://127.0.0.1:8000/posts/', {posttext: store.createPostText, createdby: store.currentUser.username})
                .then(function(response) {
                console.log(response)
                uploadUrl = `http://127.0.0.1:8000/posts/${response.data.id}/`;
                image = $scope.myImage;
                imageUpload.uploadImageToUrl(image, uploadUrl)
                getPosts();

        });


        eraseText();
    };


    getPosts();


    eraseText = function() {
        store.createPostText = '';
}

});