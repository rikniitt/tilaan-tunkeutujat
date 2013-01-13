invaders.controller.Game = function(view) {

    
    this.view = view;  
    
    this.models = new invaders.model.Collection();
    
    // Fleat holds enemy ships
    var fleat = new invaders.model.Fleat()
    this.models.add( fleat );
    
    // User controlled tank
    var tank = new invaders.model.Tank();
    this.models.add( tank );
    
    // Empty collection to hold all fired missiles
    var missiles = new invaders.model.Collection();
    this.models.add( missiles );
    
    // Shield / Covers on the bottom of the screen
    var covers = new invaders.model.Collection();
    covers.add( new invaders.model.CoverShield(50, 340) );
    covers.add( new invaders.model.CoverShield(210, 340) );
    covers.add( new invaders.model.CoverShield(370, 340) );
    covers.add( new invaders.model.CoverShield(530, 340) );
    this.models.add( covers );
    
    
    // Allow only one missile to be fired 
    var userMissile = false;
    
    // User scores and lifes
    var score = 0;
    var ships = 2;
    
    
    var that = this;
    
       
    invaders.utils.sounds.create("audio/explosion.wav", "exp");
    invaders.utils.sounds.create("audio/piu.wav", "ough");
    
    
    
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
        
        that.models.remove(tank);
        tank = new invaders.model.Tank();
        that.models.add(tank);
        
        invaders.utils.sounds.play("exp");
        
        if (ships < 0)
            gameOver();
        
    }

    function gameOver() {
//        invaders.utils.keyhandler.removeKeyObserver(113, this); // q-key
//        invaders.utils.keyhandler.removeKeyObserver(32, this); // space
        invaders.utils.keyhandler.observersReset();
        
        invaders.game.view = new invaders.view.Highscores();
        invaders.game.controller = new invaders.controller.Highscores(invaders.game.view,  score + (ships * 4000));
        
    }
    
    
    // Callback for keyhandler space key press
    this.notify = function(which) {
        if (which == 32 && !userMissile) {
            fireMissile(tank, -1);
        }
        if (which == 113) {
            gameOver();
        }
        
    };
    invaders.utils.keyhandler.addKeyObserver(32, this); //space
    invaders.utils.keyhandler.addKeyObserver(113, this); //q-key

    
    
    
    
    this.logic = function() { 

        
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
        
        
        // check if one of the fleat ships is colliding with cover 
        for (var j in covers.collection()) {
            covers.collection()[j].collideWithFleat(fleat);
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

