invaders.model.Fleat = function() {

    
    // populate ships
    var ships = new invaders.model.Collection();
    populateShips();
    
    var curRowTick = 0;
    var curDirTick = -1; // -1 to left and 1 to right
    var shipTicker = new invaders.model.Ticker(10, fleatMove);
    
    this.tick = function() {
      shipTicker.tick();  
    };
    this.render = function(context) {
      ships.render(context);  
    };
    
    function fleatMove() {
//        console.log(ships.collection()[curRowTick].collection()[0].x);
//        console.log(ships.collection()[curRowTick].collection()[9].x);
        if (ships.collection()[curRowTick].collection()[0].x < 40 || ships.collection()[curRowTick].collection()[9].x > 600) {
            ships.tick(); // drop row down
            curDirTick *= -1; // change direction
            return;
        } else {
            for (var i in ships.collection()[curRowTick].collection()) {
                var ship = ships.collection()[curRowTick].collection()[i];
                ship.x += 40 * curDirTick;
            }
        }
        curRowTick++;
        curRowTick %= 6;
    };
    
    function populateShips() {
        var y = 40;
        for (var i = 0; i<6; i++) {
            var row = new invaders.model.Collection();
            var x = 130;
            for (var j = 0; j < 10; j++) {
                row.add( new invaders.model.Ship(x,y) );
                x += 40;
            }
            y += 40;
            ships.add(row);
        }
    };
//    
//    this.collection = function() {
//      return ships;  
//    };
};

