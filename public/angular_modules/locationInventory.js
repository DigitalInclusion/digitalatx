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

	$scope.offersSkills = function(locationOrg, locationZipcode, locationSkills, filterOptions) {
		// No checkboxes selected.
		if (!filterOptions) {
			return true;
		}

		if (!filterOptions.organization && !filterOptions.zipcode && !filterOptions.programSkillsTraining) {
			return true;
		}

		// Check if the locations's organization and zipcode match filter terms.
		if (filterOptions.organization && (locationOrg !== filterOptions.organization)) {
			return false;
		}
		if (filterOptions.zipcode && (locationZipcode !== filterOptions.zipcode)) {
			return false;
		}

		// No options are selected, unset filter options.
		if (!filterOptions.programSkillsTraining ||
				(!filterOptions.programSkillsTraining.basic &&
				!filterOptions.programSkillsTraining.microsoftOffice &&
				!filterOptions.programSkillsTraining.email &&
				!filterOptions.programSkillsTraining.generalWebSearching &&
				!filterOptions.programSkillsTraining.resumeDevelopment &&
				!filterOptions.programSkillsTraining.onlineJobSearches &&
				!filterOptions.programSkillsTraining.aisdParentCloud &&
				!filterOptions.programSkillsTraining.hardware &&
				!filterOptions.programSkillsTraining.software &&
				!filterOptions.programSkillsTraining.collegePrep &&
				!filterOptions.programSkillsTraining.stem &&
				!filterOptions.programSkillsTraining.webDevelopment &&
				!filterOptions.programSkillsTraining.socialConnections &&
				!filterOptions.programSkillsTraining.other)) {
			filterOptions.programSkillsTraining = undefined;
			return true;
		}

		// Location doesn't have any skills listed.
		if (!locationSkills) {
			return false;
		// Check if the location is missing any of the selected skills.
		} else if ((filterOptions.programSkillsTraining.basic && !locationSkills.basic) ||
				(filterOptions.programSkillsTraining.microsoftOffice && !locationSkills.microsoftOffice) ||
				(filterOptions.programSkillsTraining.email && !locationSkills.email) ||
				(filterOptions.programSkillsTraining.generalWebSearching && !locationSkills.generalWebSearching) ||
				(filterOptions.programSkillsTraining.resumeDevelopment && !locationSkills.resumeDevelopment) ||
				(filterOptions.programSkillsTraining.onlineJobSearches && !locationSkills.onlineJobSearches) ||
				(filterOptions.programSkillsTraining.aisdParentCloud && !locationSkills.aisdParentCloud) ||
				(filterOptions.programSkillsTraining.hardware && !locationSkills.hardware) ||
				(filterOptions.programSkillsTraining.software && !locationSkills.software) ||
				(filterOptions.programSkillsTraining.collegePrep && !locationSkills.collegePrep) ||
				(filterOptions.programSkillsTraining.stem && !locationSkills.stem) ||
				(filterOptions.programSkillsTraining.webDevelopment && !locationSkills.webDevelopment) ||
				(filterOptions.programSkillsTraining.socialConnections && !locationSkills.socialConnections) ||
				(filterOptions.programSkillsTraining.other && !locationSkills.other)) {
			return false;
		}
		return true;
	};
});