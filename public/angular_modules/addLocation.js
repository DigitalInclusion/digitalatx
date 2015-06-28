var addLocationModule = angular.module('addLocationModule', []);

addLocationModule.controller('addLocationCtrl', function($scope) {
	$scope.testVar = 'CONTROLLER WORKS';

	$scope.formData = {};

	$scope.saveFormData = function(formData) {
		$scope.formData = angular.copy(formData);
	};
	
});