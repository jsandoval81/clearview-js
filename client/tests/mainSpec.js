'use strict';

describe('SampleListCtrl', function () {

    beforeEach(module('clearviewApp'));

    it('should create a reports model with at least 1 report', inject(function($controller) {
        var scope = {},
            ctrl = $controller('SampleListCtrl', { $scope: scope });

        expect(scope.reports.length).toBeGreaterThan(0);
    }));
    
});