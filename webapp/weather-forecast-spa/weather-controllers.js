/**
 * @author adam.caldwell
 */

// - - - - - CONTROLLERS - - - - -
weatherApp.controller('home', ['$scope', '$log', 'cityService', function ($scope, $log, cityService) {

    $scope.city = cityService.city;

    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    });

}]);

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