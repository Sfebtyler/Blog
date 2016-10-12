(function() {
var app = angular.module('blog', ['blog-users', 'blog-posts', 'blog-images', 'routes', 'file-model'])

app.service('myService', function() {
    this.received = false;
    this.currentUser = {};
    this.postId = '';
    this.createisvalid = false;
    this.noPosts = false;
    this.image = {};

});


app.factory('authInterceptor', function($location, $q, $window) {
    store = this;
    store.token = $window.localStorage.getItem('Token');

    return {
    request: function(config) {
    config.headers = config.headers || {};

    if (store.token) {
        config.headers.Authorization = 'Token ' + store.token;
    }
    return config;
    }
    };
})

.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
})

app.service('imageUpload', ['$http', function ($http) {
    this.uploadImageToUrl = function(image, uploadUrl) {
        var fd = new FormData();
        fd.append('postimage', image);
        console.dir(fd.get('postimage'))
        $http.patch(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response) {
        console.log(response.postimage)
        })
    }
}])




})();