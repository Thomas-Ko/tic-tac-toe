/*==================== 
	MODEL
====================*/
model = {
	gameRunning : true,
	
	//html of icons will be placed here when user selects their icon choice 
	icons: {
		player: null,
		computer: null,
	},

	//all tiles;
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

	//shows open tiles; tiles will be removed from this array when user or computer makes a tile choice
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

	//stores information on which tiles the user/computer is occupying
	currentTiles: {
		player: [],
		computer: [],
	},

	//all possible winning combinations, 0 corresponds to top-left tile; 1 top-center, etc.
	winningMoves : [
		[ //0
			[0,1,2], [0,2,1], [0,4,8], [0,8,4], [0,3,6], [0,6,3]
		],
		[ //1
			[1,0,2], [1,2,0], [1,4,7], [1,7,4]
		],
		[ //2
			[2,0,1], [2,1,0], [2,4,6], [2,6,4], [2,5,8], [2,8,5]
		],
		[ //3
			[3,0,6], [3,6,0], [3,4,5], [3,5,4]
		],
		[ //4
			[4,0,8], [4,8,1], [4,6,2], [4,2,6], [4,3,5], [4,5,3], [4,1,7], [4,7,1]
		],
		[ //5
			[5,4,3], [5,3,4], [5,2,8], [5,8,2]
		],
		[ //6
			[6,3,0], [6,0,3], [6,7,8], [6,8,7], [6,4,2], [6,2,4]
		],
		[ //7
			[7,6,8], [7,8,6], [7,4,1], [7,1,4]
		],
		[ //8
			[8,7,6], [8,6,7], [8,4,0], [8,0,4], [8,5,2], [8,2,5]
		]
	],
};


/*==================== 
	CONTROLLER
====================*/
controller = {
	init: function(){
		$(window).load(function(){
			controller.gameReset();
			view.init();
		});
	},

	getGameRunning : function(){
		return model.gameRunning;
	},

	gameReset : function(){
		setTimeout(function(){
			view.clearBoard();
			model.openTiles = model.board.slice();
			model.currentTiles.player=[];
			model.currentTiles.computer=[];
			model.gameRunning = true;
		},1500);

		
	},

	selectIcon: function(XorO){
		if (XorO==="X"){
			model.icons.player='<i class="fa fa-times icon-x" aria-hidden="true"></i>';
			model.icons.computer = '<i class="fa fa-circle-o icon-o" aria-hidden="true"></i>';
		} else if(XorO==="O"){
			model.icons.player='<i class="fa fa-circle-o icon-o" aria-hidden="true"></i>';
			model.icons.computer = '<i class="fa fa-times icon-x" aria-hidden="true"></i>';
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
		var index = model.openTiles.indexOf(tileID);
		if (index > -1) {
    		model.openTiles.splice(index, 1);
		}
	},

	addToTiles: function(playerOrComputer, tileID){
		var index = model.board.indexOf(tileID);
		model.currentTiles[playerOrComputer].push(index);
	},

	checkWinner: function(playerOrComputer){
		var array = model.currentTiles[playerOrComputer];
		var index = array[array.length - 1];

		//if tie
		if(index===-1){
			console.log("TIE!!!!!!!!!!!!!!!");
			controller.gameReset();
			view.winnerModalPopUp("tie");
		} else {
			var winningArray = model.winningMoves[index];
			for (i = 0; i<winningArray.length; i++){
				for (x=0; x<winningArray[i].length; x++){

					//if 3 tiles in a row (winner)
					if(x===2 &&array.indexOf(winningArray[i][x])>-1){
						model.gameRunning = false;
						controller.gameReset();
						view.winnerModalPopUp(playerOrComputer);
						return;
					} else if(array.indexOf(winningArray[i][x])>-1){
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

		var array = model.currentTiles.computer;
		// var board = model.board;
		var winningMoves = model.winningMoves;
		// console.log(winningMoves);
		// for(i=0; i<winningMoves.length;i++){
		// 	// console.log(winningMoves[i]);
		// 	for(x=0;x<winningMoves[i].length; x++){
		// 		console.log(winningMoves[i][x]);
		// 		for(y=0; y<winningMoves[i][x].length;y++);
		// 	}
		// }

		// var winningArray = model.winningMoves;
		// loop1 :
		// 	for (z=0; z<winningArray.length; z++){
				
				
		// loop2:
		// 			for (i = 0; i<winningArray[z].length; i++){
		// loop3:	
		// 				for (x=0; x<winningArray[z][i].length; x++){
		// 					// console.log(winningArray[i]);
		// 					// if(array.indexOf(winningArray[i][x])>-1){
		// 					// 	// console.log(z + "IS OPEN AND WILL WIN");
		// 					// 	// console.log("winning array is " + winningArray[i]);
		// 					// } else 
		// 					if(x===0){
		// 						console.log(winningArray[z][i][x] + " is open and will win");
		// 					}else {
		// 						console.log("no winning moves");
		// 						break loop2;
		// 					}
		// 				}
		// 			}		
		// 	}

		var winningArray = model.winningMoves;
			for(y=0;y<winningArray.length;y++){


				for (i = 0; i<winningArray[y].length; i++){
					for (x=0; x<winningArray[y][i].length; x++){

						//if 3 tiles in a row (winner)
						if(model.currentTiles.computer.indexOf(winningArray[y][i][x])>-1){
							console.log("COMP HAS" +winningArray[y][i][x]);
						}
	
						else if(x===2 && model.openTiles.indexOf(model.board[winningArray[y][i][2]])){
							console.log("TO WIN GO TO TILE " + winningArray[y][i][2]);
						}

						else {
							break;
						}
					}
				}
			}
			

		// var winningArray = model.winningMoves[index];
		// 	for (i = 0; i<winningArray.length; i++){
		// 		for (x=0; x<winningArray[i].length; x++){

		// 			//if 3 tiles in a row (winner)
		// 			if(x===2 &&array.indexOf(winningArray[i][x])>-1){
		// 				model.gameRunning = false;
		// 				controller.gameReset();
		// 				view.winnerModalPopUp(playerOrComputer);
		// 				return;
		// 			} else if(array.indexOf(winningArray[i][x])>-1){
		// 			} else {
		// 				break;
		// 			}
		// 		}
		// 	}

		// var computerCombo=[];
		// for (i=0; i<winningMoves.length; i++){
		// 	var arrayIndex = [];
		// 	for (x=0; x<winningMoves[i].length; x++){
		// 		var arrayIndexLevel2=[];
				
		// 		for (y = 0; y<winningMoves[i][x].length; y++){
		// 			var match;
		// 			if(model.currentTiles.computer.indexOf(winningMoves[i][x][y])>-1){
		// 				console.log("COMPUTER IS OCCUPYING " + winningMoves[i][x][y]);
		// 				match=true;
		// 			} else {
		// 				console.log("COMPUTER DOESN'T HAVE " +winningMoves[i][x][y]);
		// 				match=false;
		// 			}
					
		// 			arrayIndexLevel2.push(match);
		// 		}
		// 		arrayIndex.push(arrayIndexLevel2);
		// 	}
		// 	computerCombo.push(arrayIndex);
		// }

		// console.log("__________________________________");
		// console.log(computerCombo);
		// console.log("==================================");
		
		


		if (model.gameRunning){
			this.removeTile(tileID);
			this.addToTiles("computer", tileID);
			$(tileID).html(model.icons.computer);
			controller.checkWinner("computer");
		}
	},
};


/*==================== 
	VIEW
====================*/
view = {
	init: function(){
		this.chooseYourIconModal();
		this.selectIconHandler();
		this.tileClickHandler();
		this.themes.init();
	},

	chooseYourIconModal : function(){
    	$('#myModal').modal('show');
	},

	tileClickHandler: function(){
		$(".tile").on("click", ".tile-inner", function(){
			var openTiles = controller.getOpenTiles();
			var id = "#"+ $(this).attr('id');
			var gameRunning = controller.getGameRunning();
			var iconHTML = controller.getPlayerIcon();

			if (openTiles.indexOf(id)>-1 &&gameRunning){
				controller.removeTile(id);
				controller.addToTiles("player",id);
				$(this).html(iconHTML);
				controller.checkWinner("player");
				controller.computerTurn();
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
	},

	winnerModalPopUp: function(winnerOrTie){
		var message;
		if (winnerOrTie==="player"){
			message="You win!";
		} else if (winnerOrTie==="computer"){
			message="Computer wins.";
		} else if (winnerOrTie==="tie" || winnerOrTie){
			message="It's a tie.";
		}

		$("#winnerModalMessage").html(message);
		$('#winnerModal').modal('toggle');
		setTimeout(function(){
			$('#winnerModal').modal('toggle');
		},1500);					
	},

	themes: {
		init: function(){
			this.selectSimpleThemeHandler();
			this.selectRetroNeonThemeHandler();
		},
		selectSimpleThemeHandler: function(){
			$("#themeSimple").on("click", function(){
				$('link[href="assets/stylesheets/retro-neon-theme.css"]').attr('href','assets/stylesheets/simple-theme.css');
				$("#themeRetroNeon").html('<i class="fa fa-circle-o" aria-hidden="true"></i> Retro-Neon');
				$("#themeSimple").html('<i class="fa fa-dot-circle-o" aria-hidden="true"></i> Simple');
				$("#themeSimple").addClass("active-theme");
				$("#themeRetroNeon").removeClass("active-theme");
			});
		},

		selectRetroNeonThemeHandler: function(){
			$("#themeRetroNeon").on("click", function(){
				$('link[href="assets/stylesheets/simple-theme.css"]').attr('href','assets/stylesheets/retro-neon-theme.css');
				$("#themeSimple").html('<i class="fa fa-circle-o" aria-hidden="true"></i> Simple');
				$("#themeRetroNeon").html('<i class="fa fa-dot-circle-o" aria-hidden="true"></i> Retro-Neon');
				$("#themeSimple").removeClass("active-theme");
				$("#themeRetroNeon").addClass("active-theme");
			});
		},
	},
};

/*==================== 
	INITIALIZATION
====================*/
controller.init();