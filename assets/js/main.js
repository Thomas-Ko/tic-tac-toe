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
		"topLeft",			
		"topCenter",		
		"topRight",			
		"middleLeft",		
		"middleCenter",		
		"middleRight",		
		"bottomLeft",		
		"bottomCenter",		
		"bottomRight",		
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
};


view = {
	tileClickHandler: function(){
		$(".tile").on("click", ".tile-inner", function(){
			var openTiles = controller.getOpenTiles();

			var id = $(this).attr('id');

			if (openTiles.indexOf(id)>-1){
				console.log("OPEN");
				controller.removeTile(id);
				$(this).addClass("blue");

			} else {
				console.log("TAKEN");
			}
			console.log(id);
			// console.log(' I click');
		});
	}
};

view.tileClickHandler();