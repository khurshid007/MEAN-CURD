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


