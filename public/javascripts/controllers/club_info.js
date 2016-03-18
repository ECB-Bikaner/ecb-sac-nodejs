(function(){
  var app = angular.module("clubInfo", []);

  app.factory("info",['$http', function($http) {
    o = {
      name: "ElectraBuzz!",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      imgSrc: ['/images/slider-bh-1.jpg','/images/slider-bh-2.jpg','/images/slider-bh-3.jpg'],
      
      // event: [{
      //   name: "Electronics",
      //   info: "Copyright (c) 2015 Copyright Holder All Rights Reserved.",
      //   date: Date.now()
      // },{
      //   name: "Mech.ski",
      //   info: "Copyright (c) 2016 Copyright Holder All Rights Reserved.",
      //   date: Date.now()
      // }],
      // pastEvent: [{
      //   name: "Electronics",
      //   info: "Copyright (c) 2015 Copyright Holder All Rights Reserved.",
      //   date: Date.now()
      // },{
      //   name: "Mech.ski",
      //   info: "Copyright (c) 2016 Copyright Holder All Rights Reserved.",
      //   date: Date.now()
      // }]
    }
    $http.get('/0/0').success(function(data){
      o.event = data;
    });

    return o;
  }]);

  app.controller("ClubInfoController", ['$scope', 'info', function($scope, info) {
    $scope.club = info;

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
