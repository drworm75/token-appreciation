app.controller('ArcadeNewCtrl', function($scope, $location, ShareFactory, $rootScope, ArcadeFactory, GameFactory) {

    $scope.newArcade = ShareFactory.getGame();
    $scope.playedObj = {};
    $scope.gameObj = {};

    let addGameToFb = (playedObj) => {
        GameFactory.fbAddGameToFb(playedObj).then((thisGamesGbId) => {
            createPlayedGameObject($scope.playedObj);
        }).catch((error) => {
            console.log("addGameToFb error", error);
        });
    };

    let createPlayedGameObject = (userObj) => {
        GameFactory.fbCreatePlayedGameObject(userObj).then(() => {
            $location.url('/game/list'); 
        }).catch((error) => {
            console.log("createPlayedGameObject error", addGameToFb);
        });
    };

    $scope.checkForGameInFb = (playedObj) => {
        let gbIdToCheck = "";
        let thisGamesGbId = "";
        GameFactory.fbCheckForGameInFb(playedObj.giantbomb_id).then((gameByIndex) => {
            if(Object.getOwnPropertyNames(gameByIndex.data).length === 0) {  
                addGameToFb(playedObj);
            } else {
                createPlayedGameObject($scope.playedObj);
            }
        }).catch((error) => {
            console.log("checkForGameInFb error", error);
        });
    };

    $scope.button = (userInfo) => {
        let newArcade = {
            "name": userInfo.userArcade,
            "address": userInfo.userAddress
        };
        console.log("Adding new arcade");
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
            };
            $scope.checkForGameInFb($scope.gameObj);
        }).catch((error) => {
            console.log("button error", error);
        });
    };
});