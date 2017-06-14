app.controller('GameNewCtrl', function($scope, GameFactory) {
	$scope.returnedGames = "";
    $scope.header = "Game New";
    $scope.gameTitle = "Exciting New Pac-Man Plus";
    $scope.gamesArray = [];

 	$scope.radio = () => {
 		console.log("radio");
 	};

     $scope.card = (passedName) => {
    	$scope.gamesArray.forEach((gameObj) => {
    		if(gameObj.name === passedName) {
    			$scope.cardName = gameObj.name;
    			$scope.cardYear = gameObj.year;
    			$scope.cardImage = gameObj.image;
    		}
    	});
    };

    $scope.searchGiantBomb = (searchString) => {
   		GameFactory.gbSearchGiantBomb(searchString).then((gbGames) => {
   			$scope.gamesArray = gbGames;
   		}).catch((error) => {
   			console.log("searchGiantBomb error", error);
   		});
   	};


});