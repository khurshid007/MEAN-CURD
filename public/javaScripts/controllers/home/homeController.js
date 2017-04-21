app.controller('homeController',['$scope','$rootScope','$state', function($scope,$rootScope, $state) {
        $scope.name = "home";

        $scope.logout = function () {
            $rootScope.user = null;
            $state.go('login');
        };
}]);
