var addLocationModule = angular.module('addLocationModule', []);

addLocationModule.controller('addLocationCtrl', function($scope, $http) {
	$scope.testVar = 'CONTROLLER WORKS';

	$scope.formData = {};

	$scope.saveFormData = function(formData) {
		$scope.formData = angular.copy(formData);
		$scope.register();
	};

	$scope.register = function() {
		$http.post('/addLocation', {formData: $scope.formData}).
			success(function(data) {

			}).error(function(err) {
				$scope.errorMessage = err;
			});
	};

});