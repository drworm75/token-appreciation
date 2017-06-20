app.controller('GameNewCtrl', function($rootScope, $scope, GameFactory, ArcadeFactory) {

	$scope.returnedGames = "";
  $scope.header = "Game New";
  $scope.gameTitle = "Exciting New Pac-Man Plus";
  $scope.gamesArray = [];
  $scope.arcadesArray = [];
  $scope.newGameDataForUser = {};

 
  let getAllArcades = () => {
    ArcadeFactory.fbGetAllArcades().then((fbArcades) => {
      $scope.arcadesArray = fbArcades;
      }).catch((error) => {
        console.log("arcadeError", error);
      });
    };

    getAllArcades();


  $scope.card = (passedName) => {
    $scope.gamesArray.forEach((gameObj) => {
    	if(gameObj.name === passedName) {
    		$scope.cardName = gameObj.name;
    		$scope.cardYear = gameObj.year;
    		$scope.cardImage = gameObj.image;
    	}
    });
  };

  let addGameToFb = (gameToAdd, gameStatus) => {
    GameFactory.fbAddGameToFb(gameToAdd).then((thisGamesGbId) => {
    console.log("What is gameStatus", gameStatus);
      if (gameStatus === "not-played") {
        console.log("This ones going to a wish list!");
        createWishlistGameObject(thisGamesGbId);
      } else {
        console.log("This ones going to played games w/ scores!");
        createPlayedGameObject(thisGamesGbId);
      }
    }).catch((error) => {
      console.log("addGameToFb error", error);
    });
  };
 
  let createWishlistGameObject = (gameId) => {
    $scope.newGameDataForUser.is_played = false;
    $scope.newGameDataForUser.uid = $rootScope.user.uid;
    $scope.newGameDataForUser.giantbomb_id = gameId;
    GameFactory.fbCreateWishlistGameObject($scope.newGameDataForUser).then(() => {
    }).catch((error) => {
      console.log("addGameToFb error", addGameToFb);
    });
  };

    let createPlayedGameObject = (gameId) => {
    $scope.newGameDataForUser.uid = $rootScope.user.uid;
    $scope.newGameDataForUser.giantbomb_id = gameId;
    GameFactory.fbCreatePlayedGameObject($scope.newGameDataForUser).then(() => {
    }).catch((error) => {
      console.log("addGameToFb error", addGameToFb);
    });
  };


  $scope.checkForGameInFb = (passedName, gameStatus, userScore, userArcade, userDate) => {
    let gbIdToCheck = "";
    let thisGamesGbId = "";
    let holdGameObj = {};
    console.log("userDate", userDate);
    console.log("userArcade", userArcade);
    if (gameStatus === "played-game") {
        $scope.newGameDataForUser.is_played = true;
        $scope.newGameDataForUser.score = userScore;
        $scope.newGameDataForUser.arcadeid = userArcade;
        $scope.newGameDataForUser.date = userDate;
      }
    $scope.gamesArray.forEach((gameObj) => {
      if(gameObj.name === passedName) {
        gbIdToCheck = gameObj.giantbomb_id;
        holdGameObj = gameObj;
      }
    });
    GameFactory.fbCheckForGameInFb(gbIdToCheck).then((gameByIndex) => {
      if(Object.getOwnPropertyNames(gameByIndex.data).length === 0) {
          let newGameObj = {
              "name": holdGameObj.name,
              "image": holdGameObj.image,
              "year": holdGameObj.year,
              "icon": holdGameObj.icon,
              "giantbomb_id": holdGameObj.giantbomb_id
          };
          console.log("Game's not here, man.  Adding to fb!", newGameObj.name);   
          addGameToFb(newGameObj, gameStatus);
        } else {
          console.log("Careful man, there's a game here!", gameByIndex.data.name);
          gameByIndex = gameByIndex.data;
          if (gameByIndex !== null) {
            Object.keys(gameByIndex).forEach((key) => {
              gameByIndex[key].id=key;
              thisGamesGbId = gameByIndex[key].giantbomb_id;
            });
            console.log("What is gameStatus", gameStatus);
            if (gameStatus === "not-played") {
              console.log("This ones going to a wish list!");
              createWishlistGameObject(thisGamesGbId);
            } else {
              console.log("This ones going to played games w/ scores!");
              createPlayedGameObject(thisGamesGbId);
            }
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

  $scope.arcadeSearch = (inputArcade) => {
    console.log(inputArcade);
    GameFactory.fbSearchFirebaseArcades(inputArcade).then((fbArcades) => {
      $scope.arcadesArray = fbArcades;
    }).catch((error) => {
      console.log("searchGiantBomb error", error);
    });
  };



});