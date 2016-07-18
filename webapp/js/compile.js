/**
 * @Author: adam.caldwell
 */

var compile = angular.module('compile', ['ngRoute']);

compile.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'compile-page-one.html',
            controller: 'mainController'
        })
        .when('/second', {
            templateUrl: 'compile-page-two.html',
            controller: 'secondController'
        })
        .when('/second/:num', {
            templateUrl: 'compile-page-two.html',
            controller: 'secondController'
        })
});

// This is a Singleton Service
compile.service('nameService', function () {

    var self = this;
    this.name = 'John Doe';

    this.namelength = function () {
        return self.name.length;
    };

});

// IMPORTANT: This is how you should always define the controller as it prevents minification from breaking it
compile.controller('mainController', ['$scope', '$log', 'nameService', function ($scope, $log, nameService) {

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
compile.controller('secondController', ['$scope', '$log', 'nameService', '$routeParams',
    function ($scope, $log, nameService, $routeParams) {


    }
]);

// Model for directive
compile.directive("searchResult", function(){
    return {
        restrict: 'AECM', // Attribute(A), Element(E), Class(C), Comment(M)
        templateUrl: 'searchresults.html',
        replace: true,  // replace the element in the dom that indicates where this will go
        scope: {
            // Isolating the Scope - this is now the model for the scope - prevents from accidentally touching the scope of a page
            personName: '@', // Text (@)
            personAddress: '@'
        },
        // Compile
        compile: function(elem, attrs) {
            console.log('Compiling...');
            // You can use this to modify elements prior to them being displayed
            // elem.removeAttr('class');
            console.log(elem.html);

            return {
                // Avoid modifying this (per Angular JS documentation)
                // pre: function(scope, elements, attrs) {
                //     console.log('Pre-linking...');
                //     console.log(elements);
                // },

                // This is safer to modify
                post: function(scope, element, attrs){
                    // If the directive requires actual code to handle a situation you'd do it here.
                    console.log('Post-linking...');

                    console.log(scope);
                    if (scope.personObject.name == 'Jane Doe') {
                        elements.removeAttr('class');
                    }

                    console.log(elements);
                }
            }
        },

        // NOTE: Be cautious about speed of code in this, as it will look at every element in the list
        // An Empty Compile returning the post-link - a shortcut to the post-link (which is safest to modify)
        link: function(scope, element, attrs){
            // If the directive requires actual code to handle a situation you'd do it here.
            console.log('Linking...');

            console.log(scope);
            if (scope.personObject.name == 'Jane Doe') {
                elements.removeAttr('class');
            }

            console.log(elements);
        }
    }
});