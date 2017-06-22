app.controller('GameListCtrl', function($rootScope, $routeParams, $scope, GameFactory, ArcadeFactory, PlayedWishlistGamesFactory, FIREBASE_CONFIG) {
    $scope.header = "Game List";
    $scope.gameTitle = "Root Beer Tapper";
    $scope.currentUser = $rootScope.user.name;
    $scope.myGames = [];
    $scope.myArcades = [];
    $scope.currentPlayedObj = {};

    let getUserGame = (gameId, index) => {
        GameFactory.fbGetUserGame(gameId).then((userGameInfo) => {
            if (userGameInfo !== null) {
                Object.keys(userGameInfo).forEach((key) => {
                  userGameInfo[key].id=key;
                  $scope.myGames[index].name = userGameInfo[key].name;
                  $scope.myGames[index].year = userGameInfo[key].year;
                  $scope.myGames[index].icon = userGameInfo[key].icon;
                });
            }
        }).catch((error) => {

        });
    };

    let getArcadeName = (arcadeId, index) => {
        ArcadeFactory.fbGetArcadeName(arcadeId).then((arcadeInfo) => {
        console.log("arcadeInfo", arcadeInfo);
            if (arcadeInfo !== null) {
                Object.keys(arcadeInfo).forEach((key) => {
                  arcadeInfo[key].id=key;
                  $scope.myArcades[index].name = arcadeInfo[key].name;
                });
            }
        }).catch((error) => {

        });
    };

    let getGames = () => {
        GameFactory.fbGetGameList($rootScope.user.uid).then((theGames) => {
            $scope.myGames = theGames;
            console.log("myGames", $scope.myGames);
            Object.keys($scope.myGames).forEach((key, index) => {
            let userGameId = theGames[index].giantbomb_id;
            getUserGame(userGameId, index);            
            });
            Object.keys($scope.myGames).forEach((key, index) => {
            let gameArcadeId = theGames[index].arcadeid;
            getArcadeName(gameArcadeId, index);            
            });
            console.log ("myGames", $scope.myGames);
        }).catch((error) => {
            console.log("getGames error", error);
    	});
    };

    getGames();


    $scope.deleteGameFromProfile = (id) => {
        console.log("Delete Button Pressed");
        console.log("id", id);
        PlayedWishlistGamesFactory.fbDeleteGameFromProfile(id).then(() => {
            getGames();
        })
        .catch((error) => {
            console.log("deleteContact error", error);
        });
    };

        $scope.editGame = (played_id) => {
            $scope.myGames.forEach((gameObj) => {
          if(gameObj.played_id === played_id) {
            $scope.currentPlayedObj = gameObj;
            }
            console.log("currentPlayedObj", $scope.currentPlayedObj);

        });
    };

    $scope.changeScore = ()  => {
        PlayedWishlistGamesFactory.fbChangeScores($scope.currentPlayedObj).then(() => {

        }).catch(() => {
            console.log("changeScore", error);
        })
        // let objToEdit = {
        //     arcadeid: $scope.currentPlayedObj.arcadeid,
        //     date: $scope.currentPlayedObj.date,
        //     giantbomb_id: $scope.currentPlayedObj.giantbomb_id,
        //     is_played: $scope.currentPlayedObj.is_played,
        //     score: $scope.currentPlayedObj.score,
        //     uid: $scope.currentPlayedObj.uid,
        // }
        // console.log("objToEdit", objToEdit);

    };



});
