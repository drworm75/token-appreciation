app.controller('ArcadeNewCtrl', function($scope, $location, ShareFactory, $rootScope, ArcadeFactory, GameFactory) {

	$scope.newArcade = ShareFactory.getGame();
	$scope.playedObj = {};
	$scope.gameObj = {};

	let addGameToFb = (playedObj) => {
	    GameFactory.fbAddGameToFb(playedObj).then((thisGamesGbId) => {
	        console.log("This ones going to played games w/ scores!");
	        createPlayedGameObject($scope.playedObj);
	    }).catch((error) => {
	      console.log("addGameToFb error", error);
	    });
  };

    let createPlayedGameObject = (userObj) => {
    GameFactory.fbCreatePlayedGameObject(userObj).then(() => {
    }).catch((error) => {
      console.log("addGameToFb error", addGameToFb);
    });
  };


  $scope.checkForGameInFb = (playedObj) => {
    let gbIdToCheck = "";
    let thisGamesGbId = "";
   	console.log("playedObj in checkForGameInFb", playedObj);
    GameFactory.fbCheckForGameInFb(playedObj.giantbomb_id).then((gameByIndex) => {
      if(Object.getOwnPropertyNames(gameByIndex.data).length === 0) {
          console.log("Game's not here, man.  Adding to fb!", playedObj.name);   
          addGameToFb(playedObj);
        } else {
          console.log("Careful man, there's a game here!", playedObj.name);
          console.log("This ones going to played games w/ scores!");
          createPlayedGameObject($scope.playedObj);
            
          }
      }).catch((error) => {
        console.log("fbCheckForGameInFb error", error);
      });
    }   ;


	$scope.button = (userInfo) => {
		let newArcade = {
			"name": userInfo.userArcade,
			"address": userInfo.userAddress
		}
	    ArcadeFactory.fbAddArcade(newArcade).then((arcadeId) => {
	    	$scope.playedObj = {
	    		"arcadeid": arcadeId.name,
	    		"date": userInfo.userDate,
	    		"giantbomb_id": userInfo.giantbomb_id,
	    		"is_played": true,
	    		"score": userInfo.userScore,
	    		"uid": $rootScope.user.uid,
	    		"name": userInfo.userSearch
	    	};
	    	$scope.gameObj = {
	    		"giantbomb_id": userInfo.giantbomb_id,
	    		"icon": userInfo.icon,
	    		"image": userInfo.image,
	    		"name": userInfo.userSearch,
	    		"year": userInfo.year
	    	}
	    	$scope.checkForGameInFb($scope.gameObj);

    }).catch((error) => {
      console.log("searchGiantBomb error", error);
    });
  };




});