app.controller('LeaderboardCtrl', function($scope, $routeParams, UserFactory, PlayedWishlistGamesFactory, ArcadeFactory) {

  $scope.giantbomb_id =$routeParams.giantbomb_id;
  $scope.name = $routeParams.name;
  $scope.scoresArray = [];
  $scope.usersArray = [];
  $scope.arcadeArray = [];

  let matchUsers = () => {
    $scope.scoresArray.forEach((scoreObj, index) => {
      $scope.usersArray.forEach((userObj) => {
        console.log("score",scoreObj)
        console.log("user",userObj)
		if (scoreObj.uid === userObj.uid) {
			$scope.scoresArray[index].username = userObj.username;
		};
	  })
  });
};

	// let getArcadeNames = () => {
	//     $scope.scoresArray.forEach((gameObj) => {
	//     	console.log("getArcades gameObj", gameObj.arcadeid);
	// 		// ArcadeFactory.fbGetArcadeName(gameObj.arcadeid).then((fbUsers) => {
	// 	 //      $scope.usersArray.push(fbUsers);
	// 		// 	console.log("arcadeArray", $scope.arcadeArray);
	// 		//     matchUsers();
	// 	 //      }).catch((error) => {
	// 	 //        console.log("getUserNames", error);
	// 	 //      });
	// 	    });	
	//     };


	let getUserNames = () => {
	    $scope.scoresArray.forEach((gameObj) => {
		UserFactory.getUser(gameObj.uid).then((fbUsers) => {
	      $scope.usersArray.push(fbUsers);
			console.log("usersArray", $scope.usersArray);
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
	      }).catch((error) => {
	        console.log("arcadeError", error);
	      });
    };

    getLeaderboardScores();



});