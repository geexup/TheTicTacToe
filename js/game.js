window.TicGame = {};

window.TicGame.initGame = function initGame(){
	window.TicGame.currentUserVal = "X";
	window.TicGame.isGameWithMachine = false;
	window.TicGame.gameArea = [];
	window.TicGame.isGameRunning = false;

	var cells = document.getElementsByClassName("cell");
	
	for (var i = 0; i < cells.length; i++) {
		cells[i].addEventListener("click", window.TicGame.onBlockClick);
	}	

	window.TicGame.startGame();
}

window.TicGame.startGame = function startGame(){
	window.TicGame.gameArea = [];
	for (var x = 0; x < 3; x++) {
		window.TicGame.gameArea[x] = [];
		for (var y = 0; y < 3; y++) {
			window.TicGame.gameArea[x].push(new window.TicGame.Block(false));
		}
	}
	window.TicGame.isGameRunning = true;
	window.TicGame.updateBlocks();
}

window.TicGame.machine = function machine(){
	var randomCellX, randomCellY;
	var xyArr = [];

	for (var x = 0; x < window.TicGame.gameArea.length; x++) {
		for (var y = 0; y < window.TicGame.gameArea[x].length; y++) {
			if(!window.TicGame.gameArea[x][y].isSetted){
				xyArr.push([x,y]);
			}
		}
	}

	var min = 0;
	var max = xyArr.length;
	var index = Math.floor(min+Math.random()*(max-min));

	randomCellX = xyArr[index][0];
	randomCellY = xyArr[index][1];

	window.TicGame.gameArea[randomCellX][randomCellY].set("O");
	window.TicGame.step();
}

window.TicGame.step = function step(){

	for (var x = 0; x < window.TicGame.gameArea.length; x++) {

		var row = [];
		for (var y = 0; y < 3; y++) {
			row.push(window.TicGame.gameArea[y][x]);
		}


		var arg1 = window.TicGame.gameArea[x].every(function(val){
			return val.setVal == "X";
		}) || window.TicGame.gameArea[x].every(function(val){
			return val.setVal == "O";
		});

		var arg2 = row.every(function(val){
			return val.setVal == "X";
		}) || row.every(function(val){
			return val.setVal == "O";
		});

		var arg3 = (window.TicGame.gameArea[0][0].setVal !== null && window.TicGame.gameArea[0][0].setVal == window.TicGame.gameArea[1][1].setVal && window.TicGame.gameArea[1][1].setVal == window.TicGame.gameArea[2][2].setVal) || (window.TicGame.gameArea[0][2].setVal !== null && window.TicGame.gameArea[0][2].setVal == window.TicGame.gameArea[1][1].setVal && window.TicGame.gameArea[1][1].setVal == window.TicGame.gameArea[2][0].setVal);

		if( arg1 || arg2 || arg3){
			
			window.TicGame.updateBlocks();
			window.TicGame.onWin(window.TicGame.currentUserVal);
			window.TicGame.isGameRunning = false;
			return;
		}
	}

	window.TicGame.currentUserVal = window.TicGame.currentUserVal === "X" ? "O" : "X";
	window.TicGame.updateBlocks();
	if(window.TicGame.currentUserVal == "O" && window.TicGame.isGameWithMachine)
	{
		window.TicGame.machine();
	}
}

window.TicGame.updateBlocks = function updateBlocks(){
	for (var x = 0; x < window.TicGame.gameArea.length; x++) {
		for (var y = 0; y < window.TicGame.gameArea[x].length; y++) {
			var cell = document.querySelector(".row[data-row='"+x+"'] .cell[data-cell='"+y+"']");
			if(window.TicGame.gameArea[x][y].isSetted){
				cell.textContent = window.TicGame.gameArea[x][y].setVal;
			}else{
				cell.textContent = "";
			}			
		}
	}
}