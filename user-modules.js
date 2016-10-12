(function(){
var app = angular.module('blog-users', []);

app.directive("user", function() {
    return {
      restrict: 'E',
      templateUrl: "./javascript/directives/user.html"
    };
});

})();