var Game = {
	// The terminal display and map tiles
	display: null,
	map: null,
	width: 80,
	height: 25,
	
	engine:null,
	player:null,
	fire:null,
	
	init: function(){
		this.display = new ROT.Display();
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
}