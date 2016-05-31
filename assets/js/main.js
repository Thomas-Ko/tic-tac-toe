model = {
	gameRunning : true,
	icons: {
		player: '<i class="fa fa-times" aria-hidden="true"></i>',
		computer: '<i class="fa fa-circle-o" aria-hidden="true"></i>',
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
		[ //0
			[0,1,2], [0,4,8], [0,3,6] 	
		],
		[ //1
			[1,0,2], [1,4,7]
		],
		[ //2
			[2,0,1], [2,4,6], [2,5,8]
		],
		[ //3
			[3,0,6], [3,4,5]
		],
		[ //4
			[4,0,8], [4,6,2], [4,3,5], [4,1,7],
		],
		[ //5
			[5,4,3], [5,2,8]
		],
		[ //6
			[6,3,0], [6,7,8], [6,4,2]
		],
		[ //7
			[7,6,8], [7,4,1]
		],
		[ //8
			[8,7,6],[8,4,0],[8,5,2]
		]
	],
};

controller = {

	getGameRunning : function(){
		return model.gameRunning;
	},


	gameReset : function(){
		view.clearBoard();
		model.openTiles = model.board.slice();
		model.currentTiles.player=[];
		model.currentTiles.computer=[];
		model.gameRunning = true;
	},

	selectIcon: function(XorO){
		if (XorO==="X"){
			model.icons.player='<i class="fa fa-times" aria-hidden="true"></i>';
			model.icons.computer = '<i class="fa fa-circle-o" aria-hidden="true"></i>';
		} else if(XorO==="O"){
			model.icons.player='<i class="fa fa-circle-o" aria-hidden="true"></i>';
			model.icons.computer = '<i class="fa fa-times" aria-hidden="true"></i>';
		}
	},

	getPlayerIcon : function(){
		return model.icons.player;
	},

	getBoard: function(){
		return model.board;
	},

	getOpenTiles: function(){
		return model.openTiles;
	},


	removeTile: function(tileID){
		console.log("START REMOVETILE");
		var index = model.openTiles.indexOf(tileID);
		if (index > -1) {
    		model.openTiles.splice(index, 1);
		}
		console.log("model.opentiles is " +model.openTiles);
		console.log("END REMOVETILE");
	},

	addToTiles: function(playerOrComputer, tileID){
		console.log("START OF ADD TO TILES");
		console.log("tileID is " + tileID);
		console.log("model.board is " + model.board);
		var index = model.board.indexOf(tileID);
		console.log("index is " + index); 
		model.currentTiles[playerOrComputer].push(index);
		// var array = model.currentTiles[playerOrComputer];
		// controller.checkWinner(array, index);
		console.log("END OF ADD TO TILES");


	},

	checkWinner: function(playerOrComputer){
		


		var array = model.currentTiles[playerOrComputer];
		var index = array[array.length - 1];

		/*if the index is -1, then the game is a tie and the game resets; 
		The index can only be -1 for the computer because when its the computer's turn; Explain later
		*/
		if(index===-1){
			console.log("TIE!!!!!!!!!!!!!!!");
			setTimeout(controller.gameReset,2000);
		} else {
			// index = parseInt(index);

			// console.log("your array is " + array);
			// console.log("your index is " + index);

			var winningArray = model.winningMoves[index];
			for (i = 0; i<winningArray.length; i++){
				// console.log("checking " +winningArray[i]);
				for (x=0; x<winningArray[i].length; x++){
					// console.log(winningArray[i][x]);

					if(x===2 &&array.indexOf(winningArray[i][x])>-1){
						// console.log("WINNER!");
						model.gameRunning = false;
						setTimeout(controller.gameReset,2000);
						return;
					} else if(array.indexOf(winningArray[i][x])>-1){
						// console.log(winningArray[i][x] + " is a tile of yours");
					} else {
						break;
					}
					
				}
			}
		}
	},


	computerTurn: function(){
		var max = model.openTiles.length;
		var randomNum = Math.floor((Math.random() * max));
		var tileID = model.openTiles[randomNum];

		if (model.gameRunning){
			this.removeTile(tileID);
			this.addToTiles("computer", tileID);
			$(tileID).html(model.icons.computer);
			controller.checkWinner("computer");
		}
	},


};


view = {
	tileClickHandler: function(){
		$(".tile").on("click", ".tile-inner", function(){
			var openTiles = controller.getOpenTiles();
			var id = "#"+ $(this).attr('id');
			var gameRunning = controller.getGameRunning();
			var iconHTML = controller.getPlayerIcon();
			console.log("THIS IS " +id);

			if (openTiles.indexOf(id)>-1 &&gameRunning){
				console.log("OPEN");
				controller.removeTile(id);
				controller.addToTiles("player",id);
				$(this).html(iconHTML);
				controller.checkWinner("player");
				controller.computerTurn();

			} else {
			}
			
		});
	},

	selectIconHandler: function(){
		$("#xChoice").on("click", function(){
			controller.selectIcon("X");
		});

		$("#oChoice").on("click", function(){
			controller.selectIcon("O");
		});
	},

	clearBoard: function(){
		var board = controller.getBoard();
		board.forEach(function(tile){
			$(tile).html("");
		});
	}
};
view.selectIconHandler();
view.tileClickHandler();