app.factory("GameFactory", function($http, $q, GIANTBOMB_CONFIG) {
	
	let gbSearchGiantBomb = (search) => {
		let gameNames = [];
		console.log("search", search);
		console.log("gbapikey is ...", GIANTBOMB_CONFIG.gbapikey);
		return $q((resolve, reject) => {
			$http.get(`https://www.giantbomb.com/api/search/?api_key=${GIANTBOMB_CONFIG.gbapikey}&format=json&query="${search}"&resources=game&field_list=name`)
			.then((gbInfo) => {
				console.log("GameInfo back from API", gbInfo.data.results);
				let gameCollection = gbInfo.data.results
				Object.keys(gameCollection).forEach((key) => {
					 gameNames.push(gameCollection[key].name);
				})
					 console.log("gameNames", gameNames)
				resolve(gameNames);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	return {

		gbSearchGiantBomb: gbSearchGiantBomb
	};
});