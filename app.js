var app = angular.module('tp_questionaire', ['angular-loading-bar']);
 
app.controller("questions_ctrl", function($scope, $http, $timeout, $rootScope, cfpLoadingBar) {

  /*
  |--------------------------------------------------------------------------
  | ANGULAR | Loading
  |--------------------------------------------------------------------------
  */

  cfpLoadingBar.start();
	
    setTimeout( function() {
		
        cfpLoadingBar.complete();
		
    }, 30);
	
  /*
  |--------------------------------------------------------------------------
  | ANGULAR | Time
  |--------------------------------------------------------------------------
  */

  var x = 5;
  var times = [];
  var tt = 0;
  // var ap = ['AM', 'PM'];
  
  for (var i=0;tt<24*60; i++) {
    var hh = Math.floor(tt/60); 
    var mm = (tt%60); 
   // times[i] = ("0" + (hh % 24)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/24)]; // ** Times 12 format
    times[i] = ("0" + (hh % 24)).slice(-2) + ':' + ("0" + mm).slice(-2);   // ** Times 24 format
    tt = tt + x;
  }
  
  $scope.times = times;

  /*
  |--------------------------------------------------------------------------
  | Choice 1
  |--------------------------------------------------------------------------
  */

  $scope.checked_choice1 = "no";
  $scope.checked_choice1_location = 1;

  $scope.choice1_location_clone = function(){

    $scope.checked_choice1_location = $scope.checked_choice1_location + 1;
    $('#choice1_location_clone').clone().appendTo("#choice1_location_wrapper");

  };

  /*
  |--------------------------------------------------------------------------
  | Choice 2 & 3
  |--------------------------------------------------------------------------
  */

  $scope.get_address1 = function() {
    if ($('#address_1').val().length != 0) {

      $('#address_1_location').text($('#address_1').val());

    } 
  }

  $scope.address_2_location = 'Bangkok';
  $scope.address_2_date = '';
  $scope.address_2_time = '';
  
  // $scope.get_address2 = function() {
  //   if ($('#address_2').val().length != 0) {

  //     $scope.address_2_location = $('#address_2').val();

  //   } 
  // }


  /*
  |--------------------------------------------------------------------------
  | Choice 4
  |--------------------------------------------------------------------------
  */
  
  $scope.question4_choice = 'no';
  $scope.healthissue = 'no';
  $scope.bloodsickness = 'no';
  $scope.medicalneed = 'no';

  /*
  |--------------------------------------------------------------------------
  | Choice 5
  |--------------------------------------------------------------------------
  */
  
  $scope.howmuch_people_need_protection = '2';


});




