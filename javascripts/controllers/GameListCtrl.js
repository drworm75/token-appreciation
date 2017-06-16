app.controller('GameListCtrl', function($scope, GameFactory) {
    $scope.header = "Game List";
    $scope.gameTitle = "Root Beer Tapper";

    $scope.myGames = [];

    let getGames = () => {
    	console.log("Ready to get games from firebase!");
    	GameFactory.fbGetGameList().then((theGames) => {
    		console.log("theGames", theGames);
    		$scope.myGames = theGames;
    	}).catch((error) => {

    	});
    };

    getGames();




});
