var app = angular.module('githubApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainController'
        })
        .otherwise({ redirectTo: '/' });
}]);

app.controller('MainController', ['$scope', 'GithubService', function($scope, GithubService) {
    $scope.username = '';
    $scope.repositories = [];

    $scope.getRepositories = function() {
        GithubService.getRepositories($scope.username)
            .then(function(response) {
                $scope.repositories = response.data;
            })
            .catch(function(error) {
                console.error('Error fetching repositories:', error);
            });
    };
}]);

app.service('GithubService', ['$http', function($http) {
    this.getRepositories = function(username) {
        var apiUrl = 'https://api.github.com/users/' + username + '/repos';
        return $http.get(apiUrl);
    };
}]);
