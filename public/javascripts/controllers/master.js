(function(){

	var app = angular.module('sac',['ui.router', 'clubInfo', 'auth0', 'angular-storage', 'angular-jwt', 'edit_event', 'ngSanitize', 'society_info']);

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


//controllers master.js
	app.controller('HeaderCtrl', ['$scope', function($scope){
	}]);

	app.controller('HomeCtrl',['$scope','$http' ,'society_factory', function($scope, $http, society_factory){
		$scope.societies = society_factory;
		$http.get('/home').success(function(data){
			$scope.home_events = data;
		});

		$('.collapsible').collapsible({
      		accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    	});
	}]);

	app.controller('GalleryCtrl',['$scope', function($scope){
		$("#nanoGallery2").nanoGallery({
          	kind: 'picasa',
          	userID: '100385871696349461908',
          	thumbnailWidth: 'auto',
  		  	thumbnailHeight: 250,
  		  	colorScheme: 'none',
  		  	theme: 'light',
  		  	thumbnailGutterWidth : 0,
    	  	thumbnailGutterHeight : 0,
  		  	thumbnailHoverEffect: [{ name: 'labelAppear75', duration: 300 }],
          	album: '6269438245450732561',
          	i18n: { thumbnailImageDescription: 'View Photo', thumbnailAlbumDescription: 'Open Album' },
          	thumbnailLabel: { display: true, position: 'overImageOnMiddle', align: 'center' }
	    });
	}]);

	app.controller('EventCtrl',['$scope', '$http', '$stateParams', 'auth', '$window', function($scope, $http, $stateParams, auth, $window){
		$http.get('/'+ $stateParams.id).success(function(data){
			$scope.event = data;
		});

		$scope.auth = auth;

		$scope.delete = function(event) {
			if(auth.profile.nickname === event.event_club){
				$http.delete('/'+event._id).success(function(){
					$window.location.href = '#/home';
				});
			}
		};

		$scope.showDelete = function(event) {
			return auth.profile.nickname === event.event_club;
		};

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
		$scope.id = selectedSociety.id;
		$scope.full_description = selectedSociety.full_description;
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



	}]);

}());