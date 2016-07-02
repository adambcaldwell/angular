/**
 * @Author: adam.caldwell
 */

var services = angular.module('services', ['ngRoute']);

services.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'services-page-one.html',
            controller: 'mainController'
        })
        .when('/second', {
            templateUrl: 'services-page-two.html',
            controller: 'secondController'
        })
        .when('/second/:num', {
            templateUrl: 'services-page-two.html',
            controller: 'secondController'
        })
});

// This is a Singleton Service
services.service('nameService', function () {

    var self = this;
    this.name = 'John Doe';

    this.namelength = function () {
        return self.name.length;
    };

});

// IMPORTANT: This is how you should always define the controller as it prevents minification from breaking it
services.controller('mainController', ['$scope', '$log', 'nameService', function ($scope, $log, nameService) {

    $scope.name = nameService.name;

    $scope.$watch('name', function () {
        nameService.name = $scope.name;
    });

    $log.log(nameService.name);
    $log.log(nameService.namelength());

}]);

// IMPORTANT: This is how you should always define the controller as it prevents minification from breaking it
services.controller('secondController', ['$scope', '$log', 'nameService', '$routeParams',
    function ($scope, $log, nameService, $routeParams) {

        $scope.name = nameService.name;
        $scope.num = $routeParams.num || '';

        $scope.$watch('name', function () {
            nameService.name = $scope.name;
        });

        $log.log(nameService.name);
        $log.log(nameService.namelength());

    }
]);