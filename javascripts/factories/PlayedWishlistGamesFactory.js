app.factory("PlayedWishlistGamesFactory", function($http, $q, FIREBASE_CONFIG) {

  let fbDeleteGameFromProfile = (objId) => {
  	return $q((resolve, reject) => {
  		$http.delete(`${FIREBASE_CONFIG.databaseURL}/playedwishlistgames/${objId}.json`)
  		.then((results) => {
  	console.log("results", results);
  			resolve();
  		})
     .catch((error) => {
        reject(error);
      });
    });
  };

	let fbGetLeaderboardScores = (gbid) => {
		let gamesFromFb = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/playedwishlistgames.json?orderBy="giantbomb_id"&equalTo="${gbid}"`)
		.then((fbGames) => {
			console.log("fbGames from Factory", fbGames);
			let fbGameCollection = fbGames.data;
			if (fbGameCollection !== null) {
		        Object.keys(fbGameCollection).forEach((key) => {
		          fbGameCollection[key].id=key;
		          gamesFromFb.push(fbGameCollection[key]);
		        });
		    }			
				resolve(gamesFromFb);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};


  return {
  	fbDeleteGameFromProfile: fbDeleteGameFromProfile,
  	fbGetLeaderboardScores: fbGetLeaderboardScores
  }

});