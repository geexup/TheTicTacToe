window.TicGame.Block = function Block(setted, val){
	this.isSetted = setted;
	this.setVal = setted ? val : null;
	this.set = function(val){
		this.isSetted = true;
		this.setVal = val;
	};
};