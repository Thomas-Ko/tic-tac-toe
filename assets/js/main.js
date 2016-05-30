model = {

	icons: {
		player: null,
		computer: null,
	},

	board : [
		"#topLeft",			//0	
		"#topCenter",		//1	
		"#topRight",		//2	
		"#middleLeft",		//3		
		"#middleCenter",	//4	
		"#middleRight",		//5	
		"#bottomLeft",		//6	
		"#bottomCenter",	//7
		"#bottomRight",		//8	
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

	currentTiles: {
		player: [],
		computer: [],
	},

	winningMoves : [
		[ 
			[0,1,2], [0,4,8], [0,3,6] 	
		],
		[
			[1,0,2], [1,4,7]
		],
		[
			[2,0,1], [2,4,6], [2,5,8]
		]
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

	addToTiles: function(playerOrComp, tileID){
		var index = model.board.indexOf(tileID);
		model.currentTiles[playerOrComp].push(index);
	},

	computerTurn: function(){
		var max = model.openTiles.length;
		var randomNum = Math.floor((Math.random() * max));
		var tileID = model.openTiles[randomNum];

		this.removeTile(tileID);
		this.addToTiles("computer", tileID);
		$(tileID).addClass('red');
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
				controller.addToTiles("player",id);
				$(this).addClass("blue");
				controller.computerTurn();

			} else {
			}
			
		});
	}
};

view.tileClickHandler();