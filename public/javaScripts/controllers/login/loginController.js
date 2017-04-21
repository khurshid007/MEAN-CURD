app.controller('loginController',['$scope','$rootScope','$state', function($scope,$rootScope, $state) {
        $scope.name = 'Login';

 $scope.login = function (id,pass) {
    if(id=='a' && pass == 'a')
        {
        	$rootScope.user = {id:id,password:pass};
        	sessionStorage.user = $rootScope.user;
        	$state.go('home');
        }
    else
        {
            $scope.errorMessage = 'Invalid User Name or password:';
            return false;
        }
    };

}]);
