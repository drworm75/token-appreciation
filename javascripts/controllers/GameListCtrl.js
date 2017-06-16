app.controller('GameListCtrl', function($scope, GameFactory) {
    $scope.header = "Game List";
    $scope.gameTitle = "Root Beer Tapper";

    $scope.myGames = [];

    let getGames = () => {
    	GameFactory.fbGetGameList().then((theGames) => {
    		$scope.myGames = theGames;
    	}).catch((error) => {

    	});
    };

    getGames();




});
