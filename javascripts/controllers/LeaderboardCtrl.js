app.controller('LeaderboardCtrl', function($scope, $routeParams, PlayedWishlistGamesFactory) {

	$scope.giantbomb_id =$routeParams.giantbomb_id;
	$scope.name = $routeParams.name;
	$scope.scoresArray = [];

	let getLeaderboardScores = () => {
		PlayedWishlistGamesFactory.fbGetLeaderboardScores($routeParams.giantbomb_id).then((fbScores) => {
	      $scope.scoresArray = fbScores;
	      console.log("fbScores", fbScores);
	      }).catch((error) => {
	        console.log("arcadeError", error);
	      });
    };

    getLeaderboardScores();



});