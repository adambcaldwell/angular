/**
 * @author adam.caldwell
 */
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