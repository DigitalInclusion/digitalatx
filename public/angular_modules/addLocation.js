var addLocationModule = angular.module('addLocationModule', []);

addLocationModule.controller('addLocationCtrl', function($scope, $http) {
	$scope.testVar = 'CONTROLLER WORKS';

	$scope.formData = {};

	$scope.programs = [];

	$scope.saveFormData = function(location, programs) {
		location.programs = programs;
		$scope.formData = angular.copy(location);
		$scope.register();
	};

	$scope.register = function() {
		$http.post('/addLocation', {formData: $scope.formData}).
			success(function(data) {

			}).error(function(err) {
				$scope.errorMessage = err;
			});
	};


	$scope.addProgram = function() {
		$scope.programs.push({});
	};

});