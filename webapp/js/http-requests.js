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
        $scope.searchType = '';
        $scope.loading = false;

        // Spotify API URL: https://api.spotify.com
        var url = 'https://api.spotify.com/';

        // Search - v1/search
        $scope.search = function () {
            $scope.loading = true;
            $log.info("Loading: " + $scope.loading);
            $timeout(function () {
                $log.info("Search URL: " + url + 'v1/search?q="' + encodeURIComponent($scope.searchText) + '"&type=' + $scope.searchType);
                $http.get(url + 'v1/search?q="' + encodeURIComponent($scope.searchText) + '"&type=' + $scope.searchType)
                    .success(function (result) {
                        switch($scope.searchType){
                            case "artist":
                                $scope.searchResult = result.artists.items;
                                break;
                            case "album":
                                $scope.searchResult = result.albums.items;
                                break;
                            case "track":
                                $scope.searchResult = result.tracks.items;
                                break;
                            default:
                                $log.warn("Bad Search Type");
                                break;
                        }

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