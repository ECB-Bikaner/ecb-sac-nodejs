(function(){
  var app = angular.module("clubInfo", ['society_info']);

  app.controller("ClubInfoController", ['$scope', 'society_factory', '$stateParams', function($scope, society_factory, $stateParams) {

    selectedSociety = society_factory.find(function(element){
      return element.id == $stateParams.society_id;
    });

    selectedClub = selectedSociety.club_ids.find(function(element){
      return element.id == $stateParams.club_id;
    });

    $scope.club = selectedClub;

    //don't touch these line
    var options = [
      {selector:'#staggered-test', offset:40, callback:'Materialize.showStaggeredList("#staggered-test")'},
      {selector:'#staggered-test2', offset:40, callback:'Materialize.showStaggeredList("#staggered-test2")'},
    ]

    Materialize.scrollFire(options);
    $('.parallax').parallax();
    $('.slider').slider({indicators:true});
    $('.collapsible').collapsible({
      accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  }]);
  
})();
