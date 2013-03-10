var Fire = function(x, y) {
	var key = (x + "," + y);
	var cell = Map.map[key];
	cell.temp = 2;
	Map.redraw(x,y);
}

Fire.prototype.getSpeed = function() {
    return 100;
}

Fire.prototype.act = function() {
    Game.engine.lock();
	var newFire = {}
	
	var cells = Map.getCells();
	
	for(var i = 0; i < cells.length; i++){
		var cell = cells[i];
		var x = cell.x;
		var y = cell.y;
		var key = x + "," + y;
		
		if(cell.temp == 0){
			var nfire = 0;
			var tempsum = 0;
			
			// look at neighbours and give some chance of catching...
			for(var j = 0; j < ROT.DIRS[8].length; j++){
				var diff = ROT.DIRS[8][j];
				var cell2 = Map.getCell(x + diff[0], y + diff[1]);
				if(cell2 == undefined) continue;
				
				if(cell2.temp > 0){
					tempsum += cell2.temp;
					nfire += 1;
				}
			}
			
			var igniteChance = nfire/32;
			if(ROT.RNG.getUniform() <= igniteChance){
				newFire[key] = Math.floor(tempsum/nfire);
			}
		} else{
			// fire takes more fuel if it's hotter
			cell.fuel -= cell.temp;
			
			// (Slowly) put out fire if it runs our of fuel
			if(cell.fuel <= 0){
				cell.temp -= 1;
				if(cell.temp == 0){
					Map.redraw(x,y);
				}
			}
		}
	}
	
	for(var key in newFire){
		var parts = key.split(",");
		var x = parseInt(parts[0]);
		var y = parseInt(parts[1]);
		
		Map.getCell(x,y).temp = newFire[key];
		Map.redraw(x,y);
	}
	Game.engine.unlock();
}