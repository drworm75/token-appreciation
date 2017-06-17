app.controller('GameListCtrl', function($rootScope, $scope, GameFactory) {
    $scope.header = "Game List";
    $scope.gameTitle = "Root Beer Tapper";
    $scope.currentUser = $rootScope.user.name;
    $scope.myGames = [];

    let getUserGame = (gameId, index) => {
        GameFactory.fbGetUserGame(gameId).then((userGameInfo) => {
            if (userGameInfo !== null) {
                Object.keys(userGameInfo).forEach((key) => {
                console.log("index loop 2", index);
                  userGameInfo[key].id=key;
                  $scope.myGames[index]["name"] = userGameInfo[key].name;
                  $scope.myGames[index]["year"] = userGameInfo[key].year;
                  $scope.myGames[index]["icon"] = userGameInfo[key].icon;
                });
            }
            // userGameInfo.forEach((game) =>  {
            // $scope.myGames.push(game)    
            // })
        }).catch((error) => {

        });
    };

    let getGames = () => {
        GameFactory.fbGetGameList($rootScope.user.uid).then((theGames) => {
            $scope.myGames = theGames;
            Object.keys($scope.myGames).forEach((key, index) => {
            console.log("index loop 1", index);
            let userGameId = theGames[index].giantbomb_id;
            getUserGame(userGameId, index);            
            })
        }).catch((error) => {
            console.log("getGames error", error);
    	});
    };

    getGames();




});
