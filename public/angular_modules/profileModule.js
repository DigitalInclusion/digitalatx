var profileModule = angular.module('profileModule', ['ngRoute']);

profileModule.config(function ($routeProvider, $locationProvider) {
	//configure the routing rules here
    $routeProvider.when('/profile/:name/:siteid', {
     	controller: 'profileCtrl'
      });

   $routeProvider.otherwise( {redirectTo: '/'} );

        //routing DOESN'T work without html5Mode
       $locationProvider.html5Mode(true);

 //    $locationProvider.html5Mode({
 //  			enabled: true,
 //  			requireBase: false
	// });

});

profileModule.controller('profileCtrl', function($scope, $http, $location, $routeParams, $route) {

	var url = $location.$$path;
	var id = url.substr(-24);
	var currentdate = new Date(); 
	var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
	$http.post('/getLocations', {})
		.success(function(locations) {
			console.log("GET LOCATIONS SUCCESS");
			console.log(locations);
			$scope.locations = locations;
			angular.forEach(locations, function(location) {

				console.log("id:",location._id);
				if (location._id === id ) {
					console.log("PROFILE MATCH");
					$scope.location = location;
					console.dir(location);
					$scope.datetime = datetime;

				}
			});
		}).error(function(err) {
			console.log("ERROR");
			console.log(err);
		}
	);
});