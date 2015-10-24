var addLocationModule = angular.module('addLocationModule', []);

addLocationModule.controller('addLocationCtrl', function($scope, $http) {
	
	$scope.testVar = 'CONTROLLER WORKS';
	$scope.formData = {};
	$scope.programs = [];

	$scope.saveFormData = function(location, programs) {
		skills={};
		angular.forEach(programs, function(program) {
			skills = angular.extend(skills, program.programSkillsTraining);
			console.log("skills = " + skills);
		});
		console.log(skills);
		location.skills = skills;
		location.programs = programs;
		location.picture = $scope.uploadedPicture;
		$scope.formData = angular.copy(location);
		console.log($scope.formData);
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

addLocationModule.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);