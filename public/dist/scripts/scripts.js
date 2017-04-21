var app = window.app || {};
app = angular.module('MyApp', ['ui.router']);



//     .component('loginComponent', {
  //  templateUrl: 'views/login.html',
    //controller: 'loginController',
//});

app.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
	            $urlRouterProvider
                 .when("/logins", "/logins/login")
                 .otherwise('/login');

	            $stateProvider
                 .state('home', {
                     url: '/home',
                     controller: 'homeController',
                     templateUrl: 'views/Home/home.html'
                 })
                 .state('login', {
                     url: '/login',
                     controller: 'loginController',
                     templateUrl: 'views/login.html'
                 });
}]);

app.run(['$rootScope','$state',function ($rootScope,$state) {
	$rootScope.user = sessionStorage.user || null;

	 $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
	 	
	 	if(!$rootScope.user && toState.name != 'login')
	 	{
	 		event.preventDefault();
			return $state.go('login');
		}
		if($rootScope.user && toState.name == 'login')
	 	{
	 		event.preventDefault();
			return $state.go('home');
		}
	 });
}]);


//angular.bootstrap("MyApp");



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

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
app.service('fileService',['$http',function ($http) {
	var fileServiceP = {}
	var baseUrl = '/api/fileService/';

	fileServiceP.uploadFile = function (file) {
			var fd  = new FormData();

			fd.append('file',file);

			$http.post(baseUrl + 'uploadFile',fd, {
			 transformRequest: angular.identity,
			
            headers: {'Content-Type': undefined}}).success(function (res) {
				return res;
			}).error(function (err) {
				return err;
			})
	};
	return fileServiceP;
}])	
app.controller('homeController',['$scope','$rootScope','$state', function($scope,$rootScope, $state) {
        $scope.name = "home";

        $scope.logout = function () {
            $rootScope.user = null;
            $state.go('login');
        };
}]);

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
