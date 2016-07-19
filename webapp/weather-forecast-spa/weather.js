/**
 * Weather Forecast SPA
 * @author adam.caldwell
 */
// - - - - - MODULE - - - - -
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

/*
 *  - - - - - ROUTES & CONFIG - - - - -
 *  Speed improvement
 *      If debugging is required, please run the following command in the console of your browser of choice
 *      angular.reloadWithDebugInfo();
 */
weatherApp.config(['$compileProvider', '$routeProvider', function ($compileProvider, $routeProvider) {
    $compileProvider.debugInfoEnabled(false);

    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'home'
        })
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'home'
        })
        .when('/forecast', {
            templateUrl: 'forecast.html',
            controller: 'forecast'
        })
        .when('/forecast/:days', {
            templateUrl: 'forecast.html',
            controller: 'forecast'
        })
}]);

// - - - - - CONTROLLERS - - - - -
weatherApp.controller('home', ['$scope', '$log', 'cityService', function ($scope, $log, cityService) {

    $scope.city = cityService.city;

    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    });

}]);

// http://api.openweathermap.org/data/2.5/forecast?q=London,us&mode=JSON&APPID=e7b65f864cab83dd69d97726cd84adb0

weatherApp.controller('forecast', ['$scope', '$log', '$resource', '$routeParams', 'cityService',
    function ($scope, $log, $resource, $routeParams, cityService) {

    $scope.city = cityService.city;
    $scope.days = $routeParams.days || 2;

    $scope.weatherAPI =
        $resource('http://api.openweathermap.org/data/2.5/forecast/daily',
            { callback: "JSON_CALLBACK" },
            { get: { method: "JSONP" } }
        );

    $scope.weatherResults = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days, APPID: 'e7b65f864cab83dd69d97726cd84adb0' });

    $scope.convertToFahrenheit = function(degK) {
        return Math.round((1.8 * (degK - 273)) + 32);
    };

    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    };
}]);

// - - - - - SERVICES - - - - -
weatherApp.service('cityService', function(){
    var self = this;
    self.city = 'Atlanta, GA';

    this.getCity = function() {
        return self.city;
    }
});

// - - - - - DIRECTIVES - - - - -
weatherApp.directive("weatherResult", function(){
    return {
        restrict: 'E',
        templateUrl: 'weatherresults.html',
        replace: true,
        scope: {
            weatherDay: '=',
            convertToStandard: '&',
            convertToDate: '&',
            dateFormat: '@'
        }
    }
});