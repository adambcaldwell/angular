/*
 *  - - - - - ROUTES & CONFIG - - - - -
 *  Speed improvement
 *      If debugging is required, please run the following command in the console of your browser of choice
 *      angular.reloadWithDebugInfo();
 *
 *  @author adam.caldwell
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
