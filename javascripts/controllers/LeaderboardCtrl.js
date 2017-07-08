app.controller('LeaderboardCtrl', function($scope, $routeParams, UserFactory, PlayedWishlistGamesFactory, ArcadeFactory, BackgroundFactory) {

    $scope.giantbomb_id =$routeParams.giantbomb_id;
    $scope.name = $routeParams.name;
    $scope.scoresArray = [];
    $scope.usersArray = [];
    $scope.arcadesArray = [];

    let matchUsers = () => {
        $scope.scoresArray.forEach((scoreObj, index) => {
            $scope.usersArray.forEach((userObj) => {

                if (scoreObj.uid === userObj.uid) {
                    $scope.scoresArray[index].username = userObj.username;
                }
            });
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
         ArcadeFactory.fbGetArcadeName(gameObj.arcadeid).then((fbArcades) => {
           $scope.arcadesArray.push(fbArcades);
             matchArcades();
           }).catch((error) => {
             console.log("getUserNames", error);
           });
         }); 
        };


    let getUserNames = () => {
        $scope.scoresArray.forEach((gameObj) => {
            UserFactory.getUser(gameObj.uid).then((fbUsers) => {
                $scope.usersArray.push(fbUsers);
                matchUsers();
            }).catch((error) => {
                console.log("getUserNames", error);
            });
        });
    };

    let getLeaderboardScores = () => {
        PlayedWishlistGamesFactory.fbGetLeaderboardScores($routeParams.giantbomb_id).then((fbScores) => {
        $scope.scoresArray = fbScores;
            getUserNames();
            getArcadeNames();
        }).catch((error) => {
            console.log("arcadeError", error);
        });
    };

    getLeaderboardScores();

});