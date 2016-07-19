/**
 * @author adam.caldwell
 */
var myApp = angular.module('myApp', []);

myApp.controller('parentController1', ['$scope', function ($scope) {
    // Method 1
    $scope.parent1vm = {};
    $scope.parent1vm.message = 'Parent 1 Message';
}]);

myApp.controller('childController1', ['$scope', function ($scope) {
    // Method 1
    $scope.child1vm = {};
    $scope.child1vm.message = 'Child 1 Message';
}]);

// To Add Custom Watchers you'd need to inject the $scope
myApp.controller('parentController2', [function () {
    // Method 2
    this.message = 'Parent 2 Message';
}]);

myApp.controller('childController2', [function () {
    this.message = 'Child 2 Message';
}]);