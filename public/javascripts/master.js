(function(){

	var app = angular.module('sac',['ui.router','clubInfo']);
//temperary stuff
	var club_id = 0;
	var society_id = 0;

	societies = [
		{
			name : "Sci-Tech Society"
		},
		{
			name : "Sports and Games Society"
		},
		{
			name : "Arts &Literary Society"
		},
		{
			name : "Vocational Society"
		},
		{
			name : "Student & Social Welfare"
		}
	];

	app.controller('HeaderCtrl', ['$scope', function($scope){
	}]);

	app.controller('HomeCtrl',['$scope', function($scope){
		$scope.societies = societies;
	}]);

	app.controller('LoginCtrl',['$scope', function($scope){
		
	}]);

	app.controller('GalleryCtrl',['$scope', function($scope){
		$scope.pupu = ["./images/1.jpg","./images/2.jpg","./images/3.jpg","./images/4.jpg","./images/5.jpg","./images/office.jpg"];
	}]);

	app.controller('EventCtrl',['$scope', function($scope){
		
	}]);



// routing
	app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

	    $stateProvider
	        .state('home', {
		        url: '/home',
		      	templateUrl: './templetes/home.html',
		      	controller: 'HomeCtrl'
	    	})

	    	.state('login', {
		        url: '/login',
		      	templateUrl: '/login.html',
		      	controller: 'LoginCtrl'
	    	})

	    	.state('gallery', {
		        url: '/gallery',
		      	templateUrl: './templetes/gallery.html',
		      	controller: 'GalleryCtrl'
	    	})

	    	.state('club_info', {
		        url: '/{society_id}/{club_id}',
		      	templateUrl: './templetes/club_info.html',
		      	controller: 'ClubInfoController'
	    	})

	    	.state('event', {
		        url: '/event',
		      	templateUrl: './templetes/event.html',
		      	controller: 'EventCtrl'
	    	})

	  	$urlRouterProvider.otherwise('home');
	}]);

}());