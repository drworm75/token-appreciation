app.factory("GameFactory", function($http, $q, GIANTBOMB_CONFIG) {
	
	let gbSearchGiantBomb = (search) => {
		console.log("gbapikey is ...", GIANTBOMB_CONFIG.gbapikey);
		return $q((resolve, reject) => {
			$http.get('https://www.giantbomb.com/api/search/?api_key=${GIANTBOMB_CONFIG.gbapikey}&format=json&query=%22tapper%22&resources=game')
			.then((gameInfo) => {
			console.log("back from API", gameInfo.data.results["0"].name);
				resolve(gameInfo);
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