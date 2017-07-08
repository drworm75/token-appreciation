app.factory("ArcadeFactory", function($http, $q, $sce, GIANTBOMB_CONFIG, FIREBASE_CONFIG) {


	let fbGetArcadeName = (arcadeId) => {
		let arcadesFromFb = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/arcades.json?orderBy="arcadeid"&equalTo="${arcadeId}"`)
			.then((fbGames) => {
				let fbGameCollection = fbGames.data;
				if (fbGameCollection !== null) {
			        Object.keys(fbGameCollection).forEach((key) => {
			            arcadesFromFb.push(fbGameCollection[key]);
			        });
			    }			
					resolve(arcadesFromFb[0]);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	let fbGetAllArcades = () => {
		arcadesFromFb = [];
	    return $q ((resolve, reject) => {
	      $http.get(`${FIREBASE_CONFIG.databaseURL}/arcades.json`)
	      .then((fbArcades) => {
	      	let fbArcadeCollection = fbArcades.data;
			Object.keys(fbArcadeCollection).forEach((key) => {
				arcadesFromFb.push({
						"name": fbArcadeCollection[key].name,
				});					
			});
	        resolve(arcadesFromFb);
	      })
	      .catch((error) => {
	        reject(error);
	      });
	    });
	};

	let fbAddArcade = (newArcade) => {
	    return $q ((resolve, reject) => {
	      $http.post(`${FIREBASE_CONFIG.databaseURL}/arcades.json`, JSON.stringify(newArcade))
	      .then((fbArcades) => {
	      	console.log("Adding arcade object", fbArcades.data);
	        resolve(fbArcades.data);
	      })
	      .catch((error) => {
	        reject(error);
	      });
	    });
	};

	let findArcadeId = (arcadeName) => {
		let newArcadeId = "";
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/arcades.json?orderBy="name"&equalTo="${arcadeName}"`)
			.then((fbArcades) => {
		      	let fbArcadeCollection = fbArcades.data;
				Object.keys(fbArcadeCollection).forEach((key) => {

					console.log("Hello its", fbArcadeCollection[key].arcadeid);
					newArcadeId = fbArcadeCollection[key].arcadeid;
				});					
				resolve(newArcadeId);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	return {
		fbGetAllArcades: fbGetAllArcades,
		fbAddArcade: fbAddArcade,
		fbGetArcadeName: fbGetArcadeName,
		findArcadeId: findArcadeId
	};

});