app.factory("ArcadeFactory", function($http, $q, $sce, GIANTBOMB_CONFIG, FIREBASE_CONFIG) {


	let fbGetAllArcades = () => {
		arcadesFromFb = [];
	    return $q ((resolve, reject) => {
	      $http.get(`${FIREBASE_CONFIG.databaseURL}/arcades.json`)
	      .then((fbArcades) => {
	      	console.log("Adding user object", fbArcades);
	      	let fbArcadeCollection = fbArcades.data
			Object.keys(fbArcadeCollection).forEach((key) => {
				arcadesFromFb.push({
						"name": fbArcadeCollection[key].name,
				});					
			});
			console.log("arcades from fb", arcadesFromFb);
	        resolve(arcadesFromFb);
	      })
	      .catch((error) => {
	        reject(error);
	      });
	    });
	};

	return {
		fbGetAllArcades: fbGetAllArcades
	}

});