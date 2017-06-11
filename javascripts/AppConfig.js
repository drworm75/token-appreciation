app.config(function($routeProvider) {
	$routeProvider
	.when('/auth',{
		templateUrl: 'partials/auth.html',
		controller: 'AuthCtrl'
    })	
	.when('/game/list',{
		templateUrl: 'partials/game-list.html',
		controller: 'GameListCtrl'
    })
 	.when('/game/new',{
		templateUrl: 'partials/game-new.html',
		controller: 'GameNewCtrl'
    })
	.when('/arcade/list',{
		templateUrl: 'partials/arcade-list.html',
		controller: 'ArcadeListCtrl'
    })
	.when('/game/:gameid/view',{
		templateUrl: 'partials/game-view.html',
		controller: 'GameViewCtrl'
    })
    .otherwise('/game/list');                   	

});