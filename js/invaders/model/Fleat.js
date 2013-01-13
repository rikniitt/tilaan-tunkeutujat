invaders.model.Fleat = function() {

    var ROW_NUM = 5;
    
    var leftX;
    var rightX;
    
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
        
        
        
//        console.log(leftX + " " + rightX); 
//        console.log(ships.collection()[curRowTick].collection()[0].pos.left() + " " + ships.collection()[curRowTick].collection()[8].pos.right()); 
        
        if (curRowTick == (ROW_NUM - 1)) {
            leftX += 20 * curDirTick;
            rightX += 20 * curDirTick;
        
        if ((leftX < 20 || rightX > 600)) 
            {
                ships.tick(); // drop row down

                curDirTick *= -1; // change direction


            }
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
        
        leftX = ships.collection()[0].collection()[0].pos.left();
        rightX = ships.collection()[0].collection()[ships.collection()[0].collection().length - 1].pos.right();
    };
    
    
    this.fireMissile = function() {
        var shootMissile = Math.floor((Math.random()*100));
        
        if (shootMissile < 2) {
            var row = Math.floor((Math.random() * ships.collection().length));
            var col = Math.floor((Math.random() * ships.collection()[row].collection().length));
            return ships.collection()[row].collection()[col];
        }
        
        return false;
    };
    
    
    this.checkCollision = function(otherPosition) {
        for (var r in ships.collection()) {
            for (var c in ships.collection()[r].collection()) {
                var ship = ships.collection()[r].collection()[c];
                
                if (ship.pos.collide(otherPosition))
                {
                    ships.collection()[r].remove(ship);
                    return r;
                }
            }
        }
        return false;
    };
//    
//    this.collection = function() {
//      return ships;  
//    };
};

