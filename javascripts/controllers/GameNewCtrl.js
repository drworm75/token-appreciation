app.controller('GameNewCtrl', function($scope, GameFactory) {
	$scope.returnedGames = "";
    $scope.header = "Game New";
    $scope.gameTitle = "Exciting New Pac-Man Plus";

   	$scope.searchGiantBomb = (searchString) => {
   		GameFactory.gbSearchGiantBomb(searchString).then((gameInfo) => {
   			$scope.returnedGames = gameInfo.data.results["0"].name;
   		}).catch((error) => {
   			console.log("searchGiantBomb error", error);
   		});
   	};


});