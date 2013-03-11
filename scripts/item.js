var Item = function(x, y, type) {
    this._x = x;
    this._y = y;
	this._type = type;
    this._draw();
}
 
Item.prototype._draw = function() {
    Game.display.draw(this._x, this._y, "(", "#00f");
}

Item.prototype._update = function() {
    console.log("I iz updating my itemz");
}