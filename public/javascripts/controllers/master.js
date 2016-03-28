(function(){

	var app = angular.module('sac',['ui.router', 'clubInfo', 'auth0', 'angular-storage', 'angular-jwt', 'edit_event', 'ngSanitize']);

//Auth0 functions
	app.config(function (authProvider) {
	  authProvider.init({
	    domain: 'rail.auth0.com',
	    clientID: 'BR7dnfQB0ExcbUlb9wnL0IXgWUqkPqaF',
	    loginState: 'home'
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
    		$location.path('/home');
		}

		$scope.auth = auth;
	}]);

	
	app.controller('UserInfoCtrl',['$scope', 'auth', function UserInfoCtrl($scope, auth) {
		$scope.auth = auth;
	}]);



app.factory("society_factory", [function() {
	var o =  [
		{
			name : "Sci-Tech Society",
			society_info : "Hello",
			image : "./images/office.jpg",
			description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			id : 0,
			club_ids : [1,2,3]
		},
		{
			name : "Sports and Games Society",
			society_info : "Hello",
			image : "./images/office.jpg",
			description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			id : 2,
			club_ids : [1,2,3]
		},
		{
			name : "Arts &Literary Society",
			society_info : "Hello",
			image : "./images/office.jpg",
			description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			id : 1,
			club_ids : [1,2,3]
		},
		{
			name : "Vocational Society",
			society_info : "Hello",
			image : "./images/office.jpg",
			description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			id : 3,
			club_ids : [1,2,3]
		},
		{
			name : "Student & Social Welfare",
			society_info : "Hello",
			image : "./images/office.jpg",
			description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			id : 4,
			club_ids : [1,2]
		}
	];
	return o;
}]);


//controllers master.js
	app.controller('HeaderCtrl', ['$scope', function($scope){
	}]);

	app.controller('HomeCtrl',['$scope', 'society_factory', function($scope, society_factory){
		$scope.societies = society_factory;
	}]);

	app.controller('GalleryCtrl',['$scope', function($scope){
		$scope.pupu = ["./images/1.jpg","./images/2.jpg","./images/3.jpg","./images/4.jpg","./images/5.jpg","./images/office.jpg"];
	}]);

	app.controller('EventCtrl',['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){
		$http.get('/'+ $stateParams.id).success(function(data){
			$scope.event = data;
		});
	}]);
  

//lalit's Allclub.js

	app.controller('Allclubs',['$scope','society_factory','$stateParams',function($scope,society_factory,$stateParams){
		selectedSociety = society_factory.find(function(element){
			return element.id == $stateParams.id;
		});
		$scope.firstname=selectedSociety.name;
		$scope.des=selectedSociety.description;
		$scope.club=selectedSociety.club_ids;
		$scope.image=selectedSociety.image;
		$scope.club_imag=selectedSociety.image;
	}]);

 
// routing
	app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider, $httpProvider, authProvider) {

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

	    	.state('edit_event', {
		        url: '/edit_event',
		      	templateUrl: './templetes/edit-event.html',
		      	controller: 'editEventCtrl', 
		      	data: { requiresLogin: true }
	    	})

	    	.state('event', {
		        url: '/clubs/event/{id}',
		      	templateUrl: './templetes/event.html',
		      	controller: 'EventCtrl'
	    	})

	    	.state('all_club', {
				url: '/{id}',
		      	templateUrl: './templetes/Allclubs.html',
		      	controller: 'Allclubs'
	    	})


	  	$urlRouterProvider.otherwise('home');
	}]);

}());