/**
 * Playing with the Spotify API and HTTP Requests
 *
 * @Author: Adam Caldwell
 */

var httpRequests = angular.module('httpRequests', ['ngRoute']);
var timeout = 15000;
httpRequests.controller('requests', ['$scope', '$filter', '$timeout', '$http', '$log',
    function ($scope, $filter, $timeout, $http, $log) {

        $scope.searchText = '';
        $scope.loading = false;

        // Spotify API URL: https://api.spotify.com
        var url = 'https://api.spotify.com/';

        // Search - v1/search
        $scope.search = function () {
            $scope.loading = true;
            $log.info("Loading: " + $scope.loading);
            $timeout(function () {
                $http.get(url + 'v1/search?q="' + encodeURIComponent($scope.searchText) + '"&type=track')
                    .success(function (result) {
                        $scope.searchResult = result.tracks.items;
                        $log.info($scope.searchResult);
                        $scope.loading = false;
                    })
                    .error(function (data, status) {
                        $log.error(data);
                        $scope.loading = false;
                    });
            }, timeout);
        }
    }]);