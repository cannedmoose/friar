var Map = {
	width: 80,
	height: 25,
	
	map: {},
	
	init: function(w,h){
		this.width = w || this.width;
		this.height = h || this.height;
		
		var options = {
			roomWidth:[5,15],
			roomHeight:[5,15],
			corridorLength:[0,0], 
			dugPercentage:.9
			}
		var digger = new ROT.Map.Digger(this.width, this.height, options);
		
		var mapCallback = function (x, y, wall){
			var cell = {
				x:x,
				y:y,
				type:wall,
				fuel:100,
				temp:0,
				};
			this.map[x + "," + y] = cell;
		}
		
		digger.create(mapCallback.bind(this));
	},
	
	getCells:function(type){ 
		var cells = [];
		for(var key in this.map){
			if(type == undefined || type == this.map[key].type)
				cells.push(this.map[key]);
		}
		return cells;
	},
	
	getCell: function(x, y){
		return this.map[x + "," + y];
	},
	
	redraw: function(x,y){
		var cell = this.getCell(x,y);
		var bgcolor = "#000";
		var color = "#fff";
		
		if(cell.temp > 0){
			bgcolor = "#ff0";
			color = "#f00"
		}
		Game.display.draw(cell.x, cell.y, cell.type ? "#": ".", color, bgcolor);
	}
}