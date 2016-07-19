/**
 * @author adam.caldwell
 */
// - - - - - SERVICES - - - - -
weatherApp.service('cityService', function () {
    var self = this;
    self.city = 'Atlanta, GA';

    this.getCity = function () {
        return self.city;
    }
});

weatherApp.service('weatherService', ['$resource', function ($resource) {
    this.getWeather = function (city, days) {

        var weatherAPI =
            $resource('http://api.openweathermap.org/data/2.5/forecast/daily',
                {callback: "JSON_CALLBACK"},
                {get: {method: "JSONP"}}
            );
        return weatherAPI.get({q: city, cnt: days, APPID: 'e7b65f864cab83dd69d97726cd84adb0'});
    };
}]);

// - - - - - DIRECTIVES - - - - -
weatherApp.directive("weatherResult", function () {
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