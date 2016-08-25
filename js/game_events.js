window.TicGame.onWin = function onWin(who){
	alert(who+" - You WON! Lex always WON!");
};

window.TicGame.onBlockClick = function onBlockClick(e){
	var cell = this;
	var y = cell.attributes[1].value;
	var x = cell.parentNode.attributes[1].value;

	if(!window.TicGame.isGameRunning)
		return;

	if(!window.TicGame.gameArea[x][y].isSetted){
		window.TicGame.gameArea[x][y].set(window.TicGame.currentUserVal);
		window.TicGame.step();
	}
};