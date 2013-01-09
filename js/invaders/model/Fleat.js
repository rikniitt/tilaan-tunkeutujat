invaders.model.Fleat = function() {

    var ROW_NUM = 5;
    
    // populate ships
    var ships = new invaders.model.Collection();
    populateShips();
    
    var curRowTick = 0;
    var curDirTick = -1; // -1 to left and 1 to right
    var shipTicker = new invaders.model.Ticker(15, fleatMove);
    
    this.tick = function() {
      shipTicker.tick();  
    };
    this.render = function(context) {
      ships.render(context);  
    };
    
    function fleatMove() {

        for (var i in ships.collection()[curRowTick].collection()) {
            var ship = ships.collection()[curRowTick].collection()[i];
            ship.pos.x += 20 * curDirTick;
        }
        
        if (curRowTick == (ROW_NUM - 1) && (ships.collection()[curRowTick].collection()[0].pos.x < 20 || ships.collection()[curRowTick].collection()[8].pos.x > 600)) {
            ships.tick(); // drop row down

            curDirTick *= -1; // change direction

            
        }
        
        curRowTick++;
        curRowTick %= ROW_NUM;
    };
    
    function populateShips() {
        var y = 40;
        for (var i = 0; i<ROW_NUM; i++) {
            var row = new invaders.model.Collection();
            var x = 130;
            for (var j = 0; j < 9; j++) {
                row.add( new invaders.model.Ship(x,y) );
                x += 40;
            }
            y += 40;
            ships.add(row);
        }
    };
    
    
    this.checkCollision = function(otherPosition) {
        for (var r in ships.collection()) {
            for (var c in ships.collection()[r].collection()) {
                var ship = ships.collection()[r].collection()[c];
                
                if (ship.pos.collide(otherPosition))
                    return true;
            }
        }
        return false;
    };
//    
//    this.collection = function() {
//      return ships;  
//    };
};

