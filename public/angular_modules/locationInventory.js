var locationInventoryModule = angular.module('locationInventoryModule', []);

locationInventoryModule.controller('locationInventoryCtrl', function($scope, $http) {

	$scope.locationProfiles = [];

	$http.post('/getLocations', {})
		.success(function(locations) {
			console.log("GET LOCATIONS SUCCESS");
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

	$scope.offersSkills = function(locationSkills, filterOptions) {
		// No checkboxes selected.
		if (!filterOptions) {
			return true;
		}
		// No options are selected, unset filter options.
		if (!(filterOptions.basic) &&
				!(filterOptions.microsoftOffice) &&
				!(filterOptions.email) &&
				!(filterOptions.generalWebSearching) &&
				!(filterOptions.resumeDevelopment) &&
				!(filterOptions.onlineJobSearches) &&
				!(filterOptions.aisdParentCloud) &&
				!(filterOptions.hardware) &&
				!(filterOptions.software) &&
				!(filterOptions.collegePrep) &&
				!(filterOptions.stem) &&
				!(filterOptions.webDevelopment) &&
				!(filterOptions.socialConnections) &&
				!(filterOptions.other)) {
			filterOptions = undefined;
			return true;
		}

		// Location doesn't have any skills listed.
		if (!locationSkills) {
			return false;
		// Check if the location is missing any of the selected skills.
		} else if ((filterOptions.basic && !locationSkills.basic) ||
				(filterOptions.microsoftOffice && !locationSkills.microsoftOffice) ||
				(filterOptions.email && !locationSkills.email) ||
				(filterOptions.generalWebSearching && !locationSkills.generalWebSearching) ||
				(filterOptions.resumeDevelopment && !locationSkills.resumeDevelopment) ||
				(filterOptions.onlineJobSearches && !locationSkills.onlineJobSearches) ||
				(filterOptions.aisdParentCloud && !locationSkills.aisdParentCloud) ||
				(filterOptions.hardware && !locationSkills.hardware) ||
				(filterOptions.software && !locationSkills.software) ||
				(filterOptions.collegePrep && !locationSkills.collegePrep) ||
				(filterOptions.stem && !locationSkills.stem) ||
				(filterOptions.webDevelopment && !locationSkills.webDevelopment) ||
				(filterOptions.socialConnections && !locationSkills.socialConnections) ||
				(filterOptions.other && !locationSkills.other)) {
				return false;
		}
		return true;
	};
});