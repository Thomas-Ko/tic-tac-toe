model = {

	icons: {
		player: null,
		computer: null,
	},

	board : [
		"#topLeft",			
		"#topCenter",		
		"#topRight",		
		"#middleLeft",		
		"#middleCenter",	
		"#middleRight",		
		"#bottomLeft",		
		"#bottomCenter",	
		"#bottomRight",		
	],

	openTiles: [
		"#topLeft",			
		"#topCenter",		
		"#topRight",			
		"#middleLeft",		
		"#middleCenter",		
		"#middleRight",		
		"#bottomLeft",		
		"#bottomCenter",		
		"#bottomRight",		
	],
};

controller = {

	getOpenTiles: function(){
		return model.openTiles;
	},

	removeTile: function(tileID){
		var index = model.openTiles.indexOf(tileID);
		if (index > -1) {
    		model.openTiles.splice(index, 1);
		}
		console.log(model.openTiles);
	},
	computerTurn: function(){
		var max = model.openTiles.length;
		var randomNum = Math.floor((Math.random() * max));
		var tile = model.openTiles[randomNum];

		this.removeTile(tile);
		$(tile).addClass('red');
	},


};


view = {
	tileClickHandler: function(){
		$(".tile").on("click", ".tile-inner", function(){
			var openTiles = controller.getOpenTiles();

			var id = "#"+ $(this).attr('id');

			if (openTiles.indexOf(id)>-1){
				console.log("OPEN");
				controller.removeTile(id);
				$(this).addClass("blue");
				controller.computerTurn();

			} else {
			}
			
		});
	}
};

view.tileClickHandler();