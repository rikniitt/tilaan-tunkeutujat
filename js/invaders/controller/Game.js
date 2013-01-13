invaders.controller.Game = function(view) {

    
    this.view = view;  
    this.models = new invaders.model.Collection();
    
    var fleat = new invaders.model.Fleat()
    this.models.add( fleat );
    
    var tank = new invaders.model.Tank();
    this.models.add( tank );
    
    var missiles = new invaders.model.Collection();
    this.models.add( missiles );
    
    var userMissile = false;
    
    
    var score = 0;
    var ships = 2;
    
    var that = this;
    
    var covers = new invaders.model.Collection();
    covers.add( new invaders.model.CoverShield(50, 340) );
    covers.add( new invaders.model.CoverShield(210, 340) );
    covers.add( new invaders.model.CoverShield(370, 340) );
    covers.add( new invaders.model.CoverShield(530, 340) );
    this.models.add( covers );
    

    function fireMissile(who, direction) {
        
        var miss = new invaders.model.Missile(who.pos.left() + Math.floor(who.pos.w / 2), who.pos.top(), direction);
        
        if (miss.tankMissile) {
            userMissile = miss;
            
        } 
        missiles.add(miss);  
        //console.log(miss);
        
    }
    
    function tankExplode() {
        userMissile = false;
        that.models.remove(missiles);
        missiles = new invaders.model.Collection();
        that.models.add(missiles);
        ships--;
        
        if (ships < 0)
            gameOver();
        
    }

    function gameOver() {
        invaders.utils.keyhandler.removeKeyObserver(32, this); // space
        
        invaders.game.view = new invaders.view.Highscores();
        invaders.game.controller = new invaders.controller.Highscores(invaders.game.view,  score + (ships * 4000));
        
    }
    
    this.notify = function(which) {
        if (which == 32 && !userMissile) {
            fireMissile(tank, -1);
        } 
        
    };
    invaders.utils.keyhandler.addKeyObserver(32, this); //space

    
    
    
    
    this.logic = function() { 
        
        
        
        //console.log(covers.collection());
        
        
        // check if one of fleat missiles is colliding with tank or cover.
        for (var i in missiles.collection()) {
            
            var missile = missiles.collection()[i];
            
            // check for cover collisin
            var coverCollide = false;
            for (var j in covers.collection()) {
                if (covers.collection()[j].collide(missile.pos)) {
                    if (missile.tankMissile) {
                        userMissile = false;
                    }
                    coverCollide = true;
                    missiles.remove(missile);
                }
            }
            // exit loop if hitted
            if (coverCollide)
                break;
            
            
           // if is user fired missile. check if it is colliding with any of the enemies.
            if (missile.tankMissile) { 
                var shippHittedOnRow = fleat.checkCollision( userMissile.pos );
                if (shippHittedOnRow) {
                     missiles.remove(userMissile);
                     score += (shippHittedOnRow+1) * 1000;                 
                     userMissile = false;
                } else if ( userMissile.pos.bottom() < 0) {
                     missiles.remove(userMissile);
                     userMissile = false;
                }
            }
            
            
            // if enemy missile. is it colliding with tank
            if (!missile.tankMissile && tank.pos.collide(missile.pos)) {
                tankExplode();
                break;
            }
            
        }
        
        
        
        // check if one of the enimies collide with tank.
        if (fleat.checkCollision(tank.pos)) {
            tankExplode();
        }
        
        
        // check if it is time to fleat fire a missile
        var shipMissile = fleat.fireMissile();
        if (shipMissile) {
            fireMissile(shipMissile, 1);
        }

        
        this.models.tick();
    };


    this.render = function() {
        this.view.render(this.models, score, ships);
    };
    
    this.input = function() {
        var movement = invaders.utils.keyhandler.getMovement();

        tank.move(movement);
    };



    this.tick = function() {
        this.input();
        this.logic();
        this.render();
    };


};

