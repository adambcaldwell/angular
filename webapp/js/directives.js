/**
 * @Author: adam.caldwell
 */

var directives = angular.module('directives', ['ngRoute']);

directives.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'directives-page-onea.html',
            controller: 'mainController'
        })
        .when('/second', {
            templateUrl: 'directives-page-two.html',
            controller: 'secondController'
        })
        .when('/second/:num', {
            templateUrl: 'directives-page-two.html',
            controller: 'secondController'
        })
});

// This is a Singleton Service
directives.service('nameService', function () {

    var self = this;
    this.name = 'John Doe';

    this.namelength = function () {
        return self.name.length;
    };

});

// IMPORTANT: This is how you should always define the controller as it prevents minification from breaking it
directives.controller('mainController', ['$scope', '$log', 'nameService', function ($scope, $log, nameService) {

    $scope.person = [
        {
            name: 'John Doe',
            address: '555 Main St.',
            city: 'New York',
            state: 'NY',
            zip: '11111'
        },
        {
            name: 'Jane Doe',
            address: '333 Second St.',
            city: 'Buffalo',
            state: 'NY',
            zip: '11111'
        },
        {
            name: 'John Smith',
            address: '555 Main St.',
            city: 'Miami',
            state: 'FL',
            zip: '11111'
        }
    ];

    $scope.formattedAddress = function(person) {
        return person.address + ', ' + person.city + ', ' + person.state + ', ' + person.zip;
    };

}]);

// IMPORTANT: This is how you should always define the controller as it prevents minification from breaking it
directives.controller('secondController', ['$scope', '$log', 'nameService', '$routeParams',
    function ($scope, $log, nameService, $routeParams) {


    }
]);

// Model for directive
directives.directive("searchResult", function(){
    return {
        restrict: 'AECM', // Attribute(A), Element(E), Class(C), Comment(M)
        templateUrl: 'searchresults.html',
        replace: true,  // replace the element in the dom that indicates where this will go
        scope: {
            // Isolating the Scope - this is now the model for the scope - prevents from accidentally touching the scope of a page
            personName: '@', // Text (@)
            personAddress: '@'
        }
    }
});

directives.directive("searchResult2", function(){
    return {
        restrict: 'AECM', // Attribute(A), Element(E), Class(C), Comment(M)
        templateUrl: 'searchresults2.html',
        replace: true,  // replace the element in the dom that indicates where this will go
        scope: {
            // Isolating the Scope - this is now the model for the scope - prevents from accidentally touching the scope of a page
            personObject: "=" // 2-way-binding (=) *NOTE* Be Careful with this
        }
    }
});

directives.directive("searchResult3", function(){
    return {
        restrict: 'AECM', // Attribute(A), Element(E), Class(C), Comment(M)
        templateUrl: 'searchresults3.html',
        replace: true,  // replace the element in the dom that indicates where this will go
        scope: {
            // Isolating the Scope - this is now the model for the scope - prevents from accidentally touching the scope of a page
            personObject: "=",
            formattedAddressFunction: "&" // Function (&)
        }
    }
});