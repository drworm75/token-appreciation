app.controller('GameListCtrl', function($rootScope, $routeParams, $scope, GameFactory, ArcadeFactory, PlayedWishlistGamesFactory, FIREBASE_CONFIG) {
    $scope.header = "Game List";
    $scope.gameTitle = "Root Beer Tapper";
    $scope.currentUser = $rootScope.user.name;
    $scope.myGames = [];
    $scope.scoresArray = [];
    $scope.arcadesArray = [];
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
            console.log("gerUserGame error", error);
        });
    };

    let matchArcades = () => {
        $scope.scoresArray.forEach((scoreObj, index) => {
            $scope.arcadesArray.forEach((arcadeObj) => {
                if (scoreObj.arcadeid === arcadeObj.arcadeid) {
                    $scope.scoresArray[index].arcade_name = arcadeObj.name;
                }
            });
        });
    };

    let getArcadeNames = () => {
        $scope.scoresArray.forEach((gameObj) => {
            if (gameObj.arcadeid !== "") {
                ArcadeFactory.fbGetArcadeName(gameObj.arcadeid).then((fbArcades) => {
                    $scope.arcadesArray.push(fbArcades);
                    matchArcades();
                }).catch((error) => {
                    console.log("getUserNames", error);
                });
            }
        }); 
    };

    let getGames = () => {
        GameFactory.fbGetGameList($rootScope.user.uid).then((theGames) => {
            $scope.myGames = theGames;
            $scope.scoresArray = $scope.myGames;
            Object.keys($scope.myGames).forEach((key, index) => {
                let userGameId = theGames[index].giantbomb_id;
                getUserGame(userGameId, index);            
            });
            Object.keys($scope.myGames).forEach((key, index) => {
                let gameArcadeId = theGames[index].arcadeid;
                // getArcadeName(gameArcadeId, index);            
            });
            getArcadeNames();
        }).catch((error) => {
            console.log("getGames error", error);
    	});
    };

    getGames();

    $scope.deleteGameFromProfile = (id) => {
        PlayedWishlistGamesFactory.fbDeleteGameFromProfile(id).then(() => {
            getGames();
        })
        .catch((error) => {
            console.log("deleteGameFromProfile error", error);
        });
    };

    $scope.editGame = (played_id) => {
        $scope.myGames.forEach((gameObj) => {
            if(gameObj.played_id === played_id) {
                $scope.currentPlayedObj = gameObj;
            }
        });
    };

    $scope.changeScore = ()  => {
        PlayedWishlistGamesFactory.fbChangeScores($scope.currentPlayedObj).then(() => {
        }).catch(() => {
            console.log("changeScore error", error);
        });
    };
});
