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

    let addGameToFb = (gameToAdd) => {
      GameFactory.fbAddGameToFb(gameToAdd).then((fbGames) => {

      }).catch((error) => {
        console.log("addGameToFb error", addGameToFb)
      });
    };

    $scope.checkForGameInFb = (passedName) => {
      let gbIdToCheck = "";
      $scope.gamesArray.forEach((gameObj) => {
        if(gameObj.name === passedName) {
          gbIdToCheck = gameObj.giantbomb_id;
        }
      });
      GameFactory.fbCheckForGameInFb(gbIdToCheck).then((gameById) => {
        console.log("gameById", gameById.data);

      if(Object.getOwnPropertyNames(gameById.data).length === 0) {
          console.log("grab game from gameArray", $scope.gamesArray);
          addGameToFb($scope.gamesArray)
        } else {
          console.log("Careful man, there's a game here!")
          //Write Game Info to User Profile
        }

      }).catch((error) => {
        console.log("fbCheckForGameInFb error", error)
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