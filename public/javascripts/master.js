(function(){

	var app = angular.module('sac',['ui.router', 'clubInfo', 'auth0', 'angular-storage', 'angular-jwt']);

//Auth0 functions
	app.config(function (authProvider) {
	  authProvider.init({
	    domain: 'rail.auth0.com',
	    clientID: 'BR7dnfQB0ExcbUlb9wnL0IXgWUqkPqaF'
	  });
	});

	app.run(function(auth) {
	  // This hooks al auth events to check everything as soon as the app starts
	  auth.hookEvents();
	});

	app.run(function($rootScope, auth, store, jwtHelper, $location) {
	  // This events gets triggered on refresh or URL change
	  $rootScope.$on('$locationChangeStart', function() {
	    var token = store.get('token');
	    if (token) {
	      if (!jwtHelper.isTokenExpired(token)) {
	        if (!auth.isAuthenticated) {
	          auth.authenticate(store.get('profile'), token);
	        }
	      } else {
	        // Either show the login page or use the refresh token to get a new idToken
	        $location.path('/');
	      }
	    }
	  });
	});

	app.controller('LoginCtrl', ['$scope', '$http', 'auth', 'store', '$location', function ($scope, $http, auth, store, $location) {
		$scope.login = function () {
		    auth.signin({}, function (profile, token) {
		        // Success callback
		        store.set('profile', profile);
		      	store.set('token', token);
		      	$location.path('/');
		    }, function () {
		      // Error callback
		    });
		}
		$scope.logout = function() {
		 	auth.signout();
		  	store.remove('profile');
		  	store.remove('token');
		}
	}]);

	
	app.controller('UserInfoCtrl',['$scope', 'auth', function UserInfoCtrl($scope, auth) {
		$scope.auth = auth;
	}]);




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