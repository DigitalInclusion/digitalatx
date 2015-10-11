var locationInventoryModule = angular.module('locationInventoryModule', []);

locationInventoryModule.controller('locationInventoryCtrl', function($scope, $http) {

	$scope.locationProfiles = [];

	$http.post('/getLocations', {})
		.success(function(locations) {
			console.log("GET LOCATIONS SUCCESS");
			console.log(locations);
			$scope.locations = locations;
			angular.forEach(locations, function(location) {
				$scope.locationProfiles.push(
					{
						"name": location.name,
						"picture": location.picture
					}
				)
			});
		}).error(function(err) {
			console.log("ERROR");
			console.log(err);
		}
	);
});