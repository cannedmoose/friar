var Game = {
	// The terminal display and map tiles
	display: null,
	map: null,
	width: 80,
	height: 25,
	menuHeight:10,
	
	engine:null,
	player:null,
	fire:null,
	
	init: function(){
		this.display = new ROT.Display({width:this.width, height:this.height + this.menuHeight});
		document.body.appendChild(this.display.getContainer());
		
		ROT.RNG.setSeed(1);
		
		this.map = Map;
		this.map.init(this.width, this.height);
		this._drawMap();
		
		this._createPlayer();
		this._createFire();
		
		this.engine = new ROT.Engine();
		this.engine.addActor(this.player);
		this.engine.addActor(this.fire);
		this.engine.start();
	},
	
	_drawMap: function(){
		var cells = this.map.getCells()
		for(var i=0; i<cells.length; i++){
			var cell = cells[i];
			Map.redraw(cell.x, cell.y);
		}
		
		for(var i=0; i<this.width; i++){
			this.display.draw(i, this.height, "=");
		}
	},
	
	_createPlayer: function() {
		var freeCells = this.map.getCells(0);
	    var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
	    var cell = freeCells[index];
	    this.player = new Player(cell.x, cell.y);
	},
	
	_createFire: function() {
		var freeCells = this.map.getCells(0);
	    var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
	    var cell = freeCells[index];
	    this.fire = new Fire(cell.x, cell.y);
	},
	
	_clearRegion: function(x1,y1,x2,y2) {
		if(x1 > x2 || y1 > y2) return;
		
		for(x = x1; x <= x2; x++){
			for(y = y1; y <= y2; y++){
				this.display.draw(x,y," ");
			}
		}
	},
	
	_createMenu: function(title, options) {
		var startcode = "a".charCodeAt(0);
		
		this._clearRegion(0, this.height + 1, this.width - 1, this.height + this.menuHeight - 1);
		
		// print out title in area
		this.display.drawText(1, this.height + 1, title);
		
		// print out options
		for(var i = 0; i < options.length; i ++){
			var letter = String.fromCharCode(startcode + i);
			this.display.drawText(3, this.height + i + 2, letter + ") " + options[i]);
		}
	},
}