app.factory("GameFactory", function($http, $q, $sce, GIANTBOMB_CONFIG, FIREBASE_CONFIG) {

	let fbCreateWishlistGameObject = (newObject) => {
	    return $q ((resolve, reject) => {
	      $http.post(`${FIREBASE_CONFIG.databaseURL}/playedwishlistgames.json`, JSON.stringify(newObject))
	      .then((fbGames) => {
	      	console.log("Adding user object", fbGames);
	        resolve(fbGames);
	      })
	      .catch((error) => {
	        reject(error);
	      });
	    });
	};

	let fbCreatePlayedGameObject = (newObject) => {
		console.log("Played Obj", newObject);
	    return $q ((resolve, reject) => {
	      $http.post(`${FIREBASE_CONFIG.databaseURL}/playedwishlistgames.json`, JSON.stringify(newObject))
	      .then((fbGames) => {
	      	console.log("Adding user object", fbGames);
	        resolve(fbGames);
	      })
	      .catch((error) => {
	        reject(error);
	      });
	    });
	};


	let fbAddGameToFb = (newGame) => {
			console.log("newGame",newGame);
	    return $q ((resolve, reject) => {
	      $http.post(`${FIREBASE_CONFIG.databaseURL}/games.json`, JSON.stringify(newGame))
	      .then(() => {
	      	console.log("New game afer post", newGame.giantbomb_id);
	        resolve(newGame.giantbomb_id);
	      })
	      .catch((error) => {
	        reject(error);
	      });
	    });
	};

	let fbGetGameList = (userId) => {
		let gamesFromFb = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/playedwishlistgames.json?orderBy="uid"&equalTo="${userId}"`)
			.then((fbGames) => {
				let fbGameCollection = fbGames.data;
				Object.keys(fbGameCollection).forEach((key) => {
					gamesFromFb.push({
							"uid": fbGameCollection[key].uid,
							"giantbomb_id": fbGameCollection[key].giantbomb_id,
							"is_played": fbGameCollection[key].is_played,
							"score": fbGameCollection[key].score,
							"arcadeid": fbGameCollection[key].arcadeid,
							"date": fbGameCollection[key].date,
							"played_id": key
					});					
				});
				resolve(gamesFromFb);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

let fbGetUserGame = (gameId) => {
	let userGameInfoFromFb = [];
	return $q((resolve, reject) => {
		$http.get(`${FIREBASE_CONFIG.databaseURL}/games.json?orderBy="giantbomb_id"&equalTo="${gameId}"`)
		.then((fbGames) => {
			let fbGameCollection = fbGames.data;
			if (fbGameCollection !== null) {
		        Object.keys(fbGameCollection).forEach((key) => {
		          fbGameCollection[key].id=key;
		          userGameInfoFromFb.push(fbGameCollection[key]);
		        });
		    }			
				resolve(userGameInfoFromFb);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	let fbCheckForGameInFb = (gbid) => {
		let gamesFromFb = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/games.json?orderBy="giantbomb_id"&equalTo="${gbid}"`)
			.then((fbGames) => {
				resolve(fbGames);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};
	
	let gbSearchGiantBomb = (search) => {
		let gameNames = [];
		return $q((resolve, reject) => {
			$http.get(`https://token-appreciation.herokuapp.com/api/giantbomb/?api_key=${GIANTBOMB_CONFIG.gbapikey}&format=json&query="${search}"&resources=game&field_list=name,image,images,original_release_date,id`)
			.then((gbInfo) => {
				let gameCollection = gbInfo.data.results;			
				Object.keys(gameCollection).forEach((key) => {
						if (gameCollection[key].image !== null && gameCollection[key].original_release_date !== null) {
								// gameCollection[key].image.small_url = $sce.trustAsResourceUrl(gameCollection[key].image.small_url);
								gameCollection[key].original_release_date = gameCollection[key].original_release_date.slice(0,4);
						gameNames.push({
							"name": gameCollection[key].name,
							"image": gameCollection[key].image.small_url,
							"year": gameCollection[key].original_release_date,
							"icon": gameCollection[key].image.icon_url,
							"giantbomb_id": gameCollection[key].id.toString()
						});
					}
				});
				resolve(gameNames);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};	

	let fbSearchFirebaseArcades = (search) => {
		let arcadeNames = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/arcades.json?orderBy="name"&equalTo="${search}"`)
			.then((fbInfo) => {
				let fbArcadeCollection = fbInfo.data;
				if (fbArcadeCollection !== null) {
			        Object.keys(fbArcadeCollection).forEach((key) => {
			          arcadeNames.push({
			          	"name": fbArcadeCollection[key].name
			          });
		        });
		    }	
				resolve(arcadeNames);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};



	return {

		gbSearchGiantBomb: gbSearchGiantBomb,
		fbSearchFirebaseArcades: fbSearchFirebaseArcades,
		fbCreateWishlistGameObject: fbCreateWishlistGameObject,
		fbCreatePlayedGameObject: fbCreatePlayedGameObject,
		fbGetGameList: fbGetGameList,
		fbGetUserGame: fbGetUserGame,
		fbCheckForGameInFb: fbCheckForGameInFb,
		fbAddGameToFb: fbAddGameToFb
	};
});