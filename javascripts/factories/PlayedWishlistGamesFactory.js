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

	let fbChangeScores = (currentObj) => {
	    return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/playedwishlistgames/${currentObj.played_id}.json`, JSON.stringify({
            arcadeid: currentObj.arcadeid,
            date: currentObj.date,
            giantbomb_id: currentObj.giantbomb_id,
            is_played: currentObj.is_played,
            score: currentObj.score,
            uid: currentObj.uid
        })
		).then((resultz) => {
			resolve(resultz);
		})
		.catch((error) => {
		    reject(error);
		  });
		});
	};



  return {
  	fbDeleteGameFromProfile: fbDeleteGameFromProfile,
  	fbGetLeaderboardScores: fbGetLeaderboardScores,
  	fbChangeScores: fbChangeScores
  };

});