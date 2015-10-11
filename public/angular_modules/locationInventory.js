var locationInventoryModule = angular.module('locationInventoryModule', []);

locationInventoryModule.controller('locationInventoryCtrl', function($scope, $http) {
	$http.post('/getLocations', {})
		.success(function(data) {
			console.log("GET LOCATIONS SUCCESS");
			console.log(data);
			$scope.data = data;
		}).error(function(err) {
			console.log("ERROR");
			console.log(err);
		}
	);
});