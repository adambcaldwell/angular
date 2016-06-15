/**
 * @Author: Adam Caldwell
 */

var dataBindingDirectives = angular.module('dataBindingDirectives', ['ngRoute']);

// IMPORTANT: This is how you should always define the controller as it prevents minification from breaking it
dataBindingDirectives.controller('controller', ['$scope', '$filter', '$timeout', function ($scope, $filter, $timeout) {

    $scope.handle = '';
    $scope.lowercasehandle = function () {
        return $filter('lowercase')($scope.handle);
    };


    $scope.name = 'Adam';

    // Timeout is the angular wrapper for the javascript timeout.
    $timeout(function () {

        $scope.name = 'Everybody';

    }, 3000);

    // Example of Digest Cycle and Watch List/Watchers
    $scope.$watch('handle', function (newValue, oldValue) {
        console.info("Changed!");
        console.log("Old: " + oldValue);
        console.log("New: " + newValue);
    });

    // This is a new thread (async) which is why angular doesn't detect it's change
    setTimeout(function () {
        $scope.handle = "newtwitterhandle";
        console.log("Scope changed!");
    }, 3000);

    // this lets angular pick up on changes in regular old javascript (or you can user the angular $timeout )
    setTimeout(function () {
        $scope.$apply(function () {
            $scope.handle = "newertwitterhandle";
            console.log("Scope changed!");
        });
    }, 5000);
    
    // Directives examples
    $scope.characters = 5;

    // Iterating over list
    $scope.rules = [
        { rulename: 'Must be 5 characters' },
        { rulename: 'Must not be used elsewhere' },
        { rulename: 'Must be cool' }
    ];
    
    
    // Directives (Part 2)
    
}]);

var tb = document.getElementById('name');
console.log(tb);
tb.addEventListener("keypress", function () {
    console.log('Pressed.');
});