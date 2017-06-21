app.factory("ShareFactory", function() {
	let gameStorage = {};

	let saveGame = (game) => {
		console.log("game", game)
		gameStorage = game;

	}

	let getGame = () => {
		return gameStorage

	};

	return {
		saveGame: saveGame,
		getGame: getGame
	}

});