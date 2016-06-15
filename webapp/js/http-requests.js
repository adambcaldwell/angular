/**
 * Playing with the Spotify API and HTTP Requests
 *
 * @Author: Adam Caldwell
 */

var httpRequests = angular.module('httpRequests', ['ngRoute']);
var timeout = 15000;
httpRequests.controller('requests', ['$scope', '$filter', '$timeout', '$http', '$log',
    function ($scope, $filter, $timeout, $http, $log) {

    $scope.search = 'Fears';

    // Spotify API URL: https://api.spotify.com
    var url = 'https://api.spotify.com/';

    // Search - v1/search
    $timeout(function() {
        $http.get( url + 'v1/search?q="' + $scope.search + '"&type=track')
            .success(function (result) {
                $scope.searchResult = JSON.parse(JSON.stringify(result.tracks.items));
                $log.info($scope.searchResult);
            })
            .error(function (data, status) {
                $log.error(data);
            });
    }, timeout);
}]);