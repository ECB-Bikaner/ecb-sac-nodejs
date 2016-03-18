var app = angular.module('edit_event', [ 'colorpicker.module', 'wysiwyg.module'])

app.controller('editEventCtrl',['$scope', '$http', 'auth', '$window', function($scope, $http, auth, $window){
    // $scope.event_list = [];
    $scope.event = {
        event_name: "",
        event_date: "",
        short_info: "",
        event_info: "",
        event_club: auth.profile.nickname
    };

    $scope.submit = function() {
        if ($scope.event.event_info && $scope.event.event_name && $scope.event.event_date && $scope.event.short_info ) {
          // $scope.event_list.push($scope.event);
          $http.post('/home', $scope.event);
          $scope.event = {};
          $scope.event.event_info = '';
          $scope.message = '';
          $window.location.href = '#/clubs/event/56eb9e80d5b9cd6c0e15e2dd';
        } else {
          $scope.message = 'Please Fill All Feilds';
        }
      };
}]);




                