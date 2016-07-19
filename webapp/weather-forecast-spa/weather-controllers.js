/**
 * @author adam.caldwell
 */

// - - - - - CONTROLLERS - - - - -
weatherApp.controller('home', ['$scope', '$log', '$location', 'cityService',
    function ($scope, $log, $location, cityService) {

        $scope.city = cityService.city;

        $scope.$watch('city', function () {
            cityService.city = $scope.city;
        });

        $scope.submit = function () {
            $location.path("/forecast");
        }

    }]);

weatherApp.controller('forecast', ['$scope', '$log', '$routeParams', 'cityService', 'weatherService',
    function ($scope, $log, $routeParams, cityService, weatherService) {

        $scope.city = cityService.city;
        $scope.days = $routeParams.days || 2;

        $scope.weatherResults = weatherService.getWeather($scope.city, $scope.days);

        $scope.convertToFahrenheit = function (degK) {
            return Math.round((1.8 * (degK - 273)) + 32);
        };

        $scope.convertToDate = function (dt) {
            return new Date(dt * 1000);
        };
    }]);