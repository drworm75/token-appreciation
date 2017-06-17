app.controller('GameNewCtrl', function($rootScope, $scope, GameFactory) {
	$scope.returnedGames = "";
    $scope.header = "Game New";
    $scope.gameTitle = "Exciting New Pac-Man Plus";
    $scope.gamesArray = [];
    $scope.newGameDataForUser = {};

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
        console.log("addGameToFb error", addGameToFb);
      });
    };
 
    let createPlayedWishlistGameObject = (gameId) => {
      $scope.newGameDataForUser.is_played = false;
      $scope.newGameDataForUser.uid = $rootScope.user.uid;
      $scope.newGameDataForUser.giantbomb_id = gameId;
      GameFactory.fbCreatePlayedWishlistGameObject($scope.newGameDataForUser).then(() => {
      }).catch((error) => {
        console.log("addGameToFb error", addGameToFb);
      });
    };

    $scope.checkForGameInFb = (passedName) => {
      let gbIdToCheck = "";
      let thisGamesGbId = "";
      $scope.gamesArray.forEach((gameObj) => {
        if(gameObj.name === passedName) {
          gbIdToCheck = gameObj.giantbomb_id;
        }
      });
      GameFactory.fbCheckForGameInFb(gbIdToCheck).then((gameByIndex) => {
        console.log("gameByIndex", gameByIndex);

      if(Object.getOwnPropertyNames(gameByIndex.data).length === 0) {
          let whatever = $scope.gamesArray[0];
          let newGameObj = {
              "name": whatever.name,
              "image": whatever.image,
              "year": whatever.year,
              "icon": whatever.icon,
              "giantbomb_id": whatever.giantbomb_id
          };
          console.log("newGameObj", newGameObj);
          addGameToFb(newGameObj);
        } else {
          console.log("Careful man, there's a game here!", gameByIndex);
          gameByIndex = gameByIndex.data;
          if (gameByIndex !== null) {
            Object.keys(gameByIndex).forEach((key) => {
              gameByIndex[key].id=key;
              thisGamesGbId = gameByIndex[key].giantbomb_id;
            });
          createPlayedWishlistGameObject(thisGamesGbId);
        }
        }

      }).catch((error) => {
        console.log("fbCheckForGameInFb error", error);
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