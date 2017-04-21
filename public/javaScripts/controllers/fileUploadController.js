function AppCtrl($scope,$rootScope,fileService) {
	$scope.successMessage = '';
  $scope.validLogin = function () {
  if($rootScope.user)
  	return true;
  return false;
  };
  $scope.uploadFile = function(){
        var file = $scope.myFile;
       // console.log('file is ' );
       // console.dir(file);
 		fileService.uploadFile(file).then(function (res) {
 			$scope.successMessage = "File uploaded successfully....";
 		},function (error) {
 		$scope.successMessage = "Erorr...."+ error;
 		})
 		
    };
}
app.controller('mainCtrl',['$scope','$rootScope','fileService', AppCtrl]);