/**
 * @Author: Adam Caldwell
 */

var singlePageApp = angular.module('singlePageApp', ['ngRoute']);

singlePageApp.config(function($routeProvider){

    $routeProvider
        .when('/', {
            templateUrl: 'single-page-first.html',
            controller: 'single'
        })
        .when('/second', {
            templateUrl: 'single-page-second.html',
            controller: 'singleDouble'
        })
        .when('/second/:num', {
            templateUrl: 'single-page-second.html',
            controller: 'singleDouble'
        })
});

// Scope is a child scope, which is why it's different in each controller.
// Log is a singleton

singlePageApp.controller('single', ['$scope', '$timeout', '$http', '$log', '$location',
    function ($scope, $timeout, $http, $log, $location) {
        
        $scope.name = 'Single';
        $log.info($location.path());

        $log.main = 'Property from main';
        $log.info($log);

    }
]);


singlePageApp.controller('singleDouble', ['$scope', '$timeout', '$http', '$log', '$routeParams',
    function ($scope, $timeout, $http, $log, $routeParams) {

        $scope.name = 'Single Double';
        $scope.num = $routeParams.num || '';

        $log.second = 'Property from second';
        $log.info($log);
    }
]);

// This allows us to simulate changing pages without ever leaving the loaded page.
window.addEventListener('hashchange', function(){
    if (window.location.hash === '#/bookmark/1'){
        // console.log('Page 1 is cool.');
    }

    if (window.location.hash === '#/bookmark/2'){
        // console.log('Let me go get page 2.');
    }

    if (window.location.hash === '#/bookmark/3'){
        // console.log('Here\'s page 3.');
    }
});