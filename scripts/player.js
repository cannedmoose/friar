var Player = function(x, y) {
    this._x = x;
    this._y = y;
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

Player.prototype.handleEvent = function(e) {
	if (!(e.keyCode in keyMap)) {return; }

	var direction = keyMap[e.keyCode];
	var diff = ROT.DIRS[8][direction];
	var newX = this._x + diff[0];
	var newY = this._y + diff[1];
	
	if (Game.map.getCell(newX, newY).type) {return; } /* cannot move in this direction */
	
	Map.redraw(this._x, this._y);
	
	this._x = newX;
	this._y = newY;
	this._draw();
	window.removeEventListener("keydown", this);
	Game.engine.unlock();
}