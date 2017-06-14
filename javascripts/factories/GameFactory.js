app.factory("GameFactory", function($http, $q, $sce, GIANTBOMB_CONFIG, FIREBASE_CONFIG) {

	let fbGetGameList = () => {
		let gamesFromFb = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/games.json`)
			.then((fbGames) => {
				let fbGameCollection = fbGames.data;
				console.log(fbGameCollection);
				Object.keys(fbGameCollection).forEach((key) => {
					gamesFromFb.push({
							"name": fbGameCollection[key].title,
							"year": fbGameCollection[key].release_year
						});
				});
				console.log(gamesFromFb[0].name);
				resolve(gamesFromFb);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};
	
	let gbSearchGiantBomb = (search) => {
		let gameNames = [];
		return $q((resolve, reject) => {
			$http.get(`https://www.giantbomb.com/api/search/?api_key=${GIANTBOMB_CONFIG.gbapikey}&format=json&query="${search}"&resources=game&field_list=name,image,images,original_release_date`)
			.then((gbInfo) => {
				let gameCollection = gbInfo.data.results;			
				Object.keys(gameCollection).forEach((key) => {
						if (gameCollection[key].image !== null && gameCollection[key].original_release_date !== null) {
								gameCollection[key].image.small_url = $sce.trustAsResourceUrl(gameCollection[key].image.small_url);
								gameCollection[key].original_release_date = gameCollection[key].original_release_date.slice(0,4);
						gameNames.push({
							"name": gameCollection[key].name,
							"image": gameCollection[key].image.small_url,
							"year": gameCollection[key].original_release_date
						});
					}
				});
					 console.log("gameNames", gameNames);
				resolve(gameNames);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	return {

		gbSearchGiantBomb: gbSearchGiantBomb,
		fbGetGameList: fbGetGameList
	};
});