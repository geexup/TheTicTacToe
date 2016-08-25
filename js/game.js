
var currentUserVal = "X";
var isGameWithMachine = false;

function Block(setted, val){
	this.isSetted = setted;
	this.setVal = setted ? val: null;
	this.set = function(val){
		this.isSetted = true;
		this.setVal = val;
	};
};

var gameArea = [];
var isGameRunning = false;

function startGame(){
	gameArea = [];
	for (var x = 0; x < 3; x++) {
		gameArea[x] = [];
		for (var y = 0; y < 3; y++) {
			gameArea[x].push(new Block(false));
		}
	}
	isGameRunning = true;
	updateBlocks();
}

function machine(){
	var randomCellX, randomCellY;
	var xyArr = [];

	for (var x = 0; x < gameArea.length; x++) {
		for (var y = 0; y < gameArea[x].length; y++) {
			if(!gameArea[x][y].isSetted){
				xyArr.push([x,y]);
			}
		}
	}

	console.log(xyArr);

	var min = 0;
	var max = xyArr.length;
	var index = Math.floor(min+Math.random()*(max-min));

	randomCellX = xyArr[index][0];
	randomCellY = xyArr[index][1];

	gameArea[randomCellX][randomCellY].set("O");
	step();
}

var cells = document.getElementsByClassName("cell");
for (var i = 0; i < cells.length; i++) {
		cells[i].addEventListener("click", onBlockClick);
	}	

function step(){

	for (var x = 0; x < gameArea.length; x++) {

		var row = [];
		for (var y = 0; y < 3; y++) {
			row.push(gameArea[y][x]);
		}


		var arg1 = gameArea[x].every(function(val){
			return val.setVal == "X";
		}) || gameArea[x].every(function(val){
			return val.setVal == "O";
		});

		var arg2 = row.every(function(val){
			return val.setVal == "X";
		}) || row.every(function(val){
			return val.setVal == "O";
		});

		var arg3 = (gameArea[0][0].setVal !== null && gameArea[0][0].setVal == gameArea[1][1].setVal && gameArea[1][1].setVal == gameArea[2][2].setVal) || (gameArea[0][2].setVal !== null && gameArea[0][2].setVal == gameArea[1][1].setVal && gameArea[1][1].setVal == gameArea[2][0].setVal);

		if( arg1 || arg2 || arg3){
			
			updateBlocks();
			onWin(currentUserVal);
			isGameRunning = false;
			return;
		}
		//console.log(row);
	}


	currentUserVal = currentUserVal === "X" ? "O" : "X";

	updateBlocks();


	if(currentUserVal == "O" && isGameWithMachine)
	{
		machine();
	}
}

function onWin(who){
	alert(who+" - You WON! Lex always WON!");
}

function onBlockClick(e){
	var cell = this;
	var y = cell.attributes[1].value;
	var x = cell.parentNode.attributes[1].value;

	//console.log(x,y);
	if(!isGameRunning)
		return;

	if(!gameArea[x][y].isSetted){
		gameArea[x][y].set(currentUserVal);
		step();
	}
	console.log( gameArea[x][y] );
}

function updateBlocks(){
	for (var x = 0; x < gameArea.length; x++) {
		for (var y = 0; y < gameArea[x].length; y++) {
			var cell = document.querySelector(".row[data-row='"+x+"'] .cell[data-cell='"+y+"']");
			if(gameArea[x][y].isSetted){
				cell.textContent = gameArea[x][y].setVal;
			}else{
				cell.textContent = "";
			}			
		}
	}
}


startGame();