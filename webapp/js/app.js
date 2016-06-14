/**
 * @Author: Adam Caldwell
 */

// Adding ngMessages dependencies
var myApp = angular.module('myApp', ['ngMessages', 'ngResource']);

// IMPORTANT: This is how you should always define the controller as it prevents minification from breaking it
myApp.controller('mainController', ['$scope', '$log', '$filter', function($scope, $log, $filter) {

    $log.info($scope);

    console.log($scope);
    console.log($log);
    console.log($filter);

    // Using $log
    $log.log("Hello.");
    $log.info("This is some information!");
    $log.warn ("Warning!");
    $log.debug("Some debug information while writing my code");
    $log.error("This was an errors!!!");


    // Using $filter
    $scope.name = 'Adam';
    $scope.formattedname = $filter('uppercase')($scope.name);
    $log.log($scope.name);
    $log.log($scope.formattedname);
}]);

var searchPeople = function(firstName, $scope, height, age, occupation){
    return 'Jane Doe';
};

console.log(angular.injector().annotate(searchPeople));

// NOTE: Arrays can contain functions - This is important as once the JS gets minified
var things = [
    1,
    '2',
    function() {
        alert('Hello!');
    }
];

// Calling the unnamed function in the 3rd element of this array (0 based array)
things[2]();

console.log(things);