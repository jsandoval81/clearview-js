'use strict';

var clearviewApp = angular.module('clearviewApp', []);

clearviewApp.controller('SampleListCtrl', ['$scope', function ($scope) {
    $scope.reports = [
        { 'name': 'Report 1', 'description': 'Description 1', 'age': 4 },
        { 'name': 'Report 2', 'description': 'Description 2', 'age': 3 },
        { 'name': 'Report 3', 'description': 'Description 3', 'age': 2 },
        { 'name': 'Report 4', 'description': 'Description 4', 'age': 1 }
    ];
    $scope.reportOrder = 'name';
}]);