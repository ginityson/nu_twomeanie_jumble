var myApp=angular.module( 'myApp', [] );
//controller
myApp.controller( 'whereMyPeeps', [ '$scope', '$http', function( $scope, $http ){
  $scope.addRecord = function(){
    event.preventDefault();
    var objectToSend ={
      name: $scope.nameIn,
      location: $scope.locationIn
  };//end of object objectToSend

    $http({
      method: 'POST',
      url: '/testPost',
      data: objectToSend
  });//end of $http call
    $scope.nameIn ='';
    $scope.locationIn='';
    $scope.getRecords();
};//end of addRecord function

  $scope.getRecords = function(){
    $http({
      method: 'GET',
      url: '/getRecords',
    }).then( function( response ){
      $scope.allTheRecords = response; // .data;
      console.log( $scope.allTheRecords );
    },
    function myError( response ){
      console.log( response.statusText );
    }
  );
  };//end of getRecords function
}]);//end of controller
