app.controller('navbarController',['$scope','$rootScope','$state', function($scope,$rootScope, $state) {
        $scope.name = "Navbar";

        $scope.isLoggedIn = function () {
            if($rootScope.user)
            	return true;
            return false;
        };

          $scope.logout = function () {
            $rootScope.user = null;
            $state.go('login');
        };
         $scope.isActive = function (stateName) {
            if ($state.$current.name.indexOf(stateName) > -1)
                return true;
            else
                return false;
        };
}]);
