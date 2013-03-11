var Menu = function(title, items, callbacks) {
	this.title = title;
	this.items = items;
	this.callbacks = callbacks;
	Game._createMenu(title, items);
}

var Player = function(x, y) {
    this._x = x;
    this._y = y;
	this._items = [];
	this._menu = null;
    this._draw();
}
 
Player.prototype._draw = function() {
    Game.display.draw(this._x, this._y, "@", "#ff0");
}

Player.prototype.getSpeed = function() {
    return 100;
}

Player.prototype.act = function() {
    Game.engine.lock();
    /* wait for user input; do stuff when user hits a key */
	this._draw();
    window.addEventListener("keydown", this);
}

var keyMap = {};
keyMap[38] = 0;
keyMap[33] = 1;
keyMap[39] = 2;
keyMap[34] = 3;
keyMap[40] = 4;
keyMap[35] = 5;
keyMap[37] = 6;
keyMap[36] = 7;
keyMap[77] = 8;

Player.prototype.handleEvent = function(e) {
	console.log(e.keyCode);
	// Handle menu
	if(this._menu){
		var item = e.keyCode - ROT.VK_A;
		if(item < 0 || item >= this._menu.items.length)
			return;
		
		// call menu item
		var r = this._menu.callbacks[item]();
		if(r){
			Game._clearRegion(0, Game.height + 1, Game.width - 1, Game.height + Game.menuHeight - 1);
			this._menu = null;
			window.removeEventListener("keydown", this);
			Game.engine.unlock();
		}
		return;
	}
	
	if (!(e.keyCode in keyMap)) {return; }
	
	// handle item pickup...
	// handle item use
	// handle item throw
	
	if(e.keyCode == 77){
		var f1 = function(){
			console.log("Die");
			return true;
		}
		
		var f2 = function(){
			console.log("Don't die");
			return true;
		}
		
		var cancel = function(){
			console.log("canceled");
			this._menu = null;
			Game._clearRegion(0, Game.height + 1, Game.width - 1, Game.height + Game.menuHeight - 1);
			return false;
		}
		
		this._menu = new Menu("Test", ["Die", "Don't Die", "Cancel"], [f1.bind(this),f2.bind(this),cancel.bind(this)]);
		return;
	}

	var direction = keyMap[e.keyCode];
	var diff = ROT.DIRS[8][direction];
	var newX = this._x + diff[0];
	var newY = this._y + diff[1];
	
	if (Game.map.getCell(newX, newY).type) {return;} /* cannot move in this direction */
	
	Map.redraw(this._x, this._y);
	
	this._x = newX;
	this._y = newY;
	this._draw();
	window.removeEventListener("keydown", this);
	Game.engine.unlock();
}