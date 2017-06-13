app.controller('GameNewCtrl', function($scope, GameFactory) {
	$scope.returnedGames = "";
    $scope.header = "Game New";
    $scope.gameTitle = "Exciting New Pac-Man Plus";
    $scope.gamesArray

   	$scope.searchGiantBomb = (searchString) => {
   		GameFactory.gbSearchGiantBomb(searchString).then((gbGames) => {
   			$scope.gamesArray = gbGames;
   		}).catch((error) => {
   			console.log("searchGiantBomb error", error);
   		});
   	};


});