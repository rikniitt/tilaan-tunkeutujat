/**
 * Game controller and logic.
 */
invaders.controller.Game = function(view) {

    
    this.view = view;  
    
    
    // Populate all needed models
    this.models = new invaders.model.Collection();
    
    // Fleat holds enemy ships
    var fleat = new invaders.model.Fleat()
    this.models.add( fleat );
    
    // User controlled tank
    var tank = new invaders.model.Tank();
    this.models.add( tank );
    
    // Empty collection which will hold all fired missiles
    var missiles = new invaders.model.Collection();
    this.models.add( missiles );
    
    // Shield / Covers on the bottom of the screen
    var covers = new invaders.model.Collection();
    covers.add( new invaders.model.CoverShield(50, 340) );
    covers.add( new invaders.model.CoverShield(210, 340) );
    covers.add( new invaders.model.CoverShield(370, 340) );
    covers.add( new invaders.model.CoverShield(530, 340) );
    this.models.add( covers );
    
    
    
    // Allow only one missile to be fired. This keeps track if missile is in the air.
    var userMissile = false;
    
    // User scores and lifes
    var score = 0;
    var ships = 2;
    
    
    var that = this;
    
    
    function fireMissile(who, direction) {
        
        // Create missile in position of who was firing.
        var miss = new invaders.model.Missile(who.pos.left() + Math.floor(who.pos.w / 2), who.pos.top(), direction);
        
        // Keep track users missile.
        if (miss.tankMissile) {
            userMissile = miss;
            invaders.utils.sounds.play("tank_missile");
        } 
        
        missiles.add(miss);  
    }
    
    
    function tankExplode() {
        userMissile = false;
        
        // Clear all missiles
        that.models.remove(missiles);
        missiles = new invaders.model.Collection();
        that.models.add(missiles);
        
        // User loses life
        ships--;
        
        // Set tank in default position
        that.models.remove(tank);
        tank = new invaders.model.Tank();
        that.models.add(tank);

        invaders.utils.sounds.play("tank_explosion");
        
        // Check if game is over
        if (ships < 0)
            gameOver();
        
    }

    function gameOver() {
//        invaders.utils.keyhandler.removeKeyObserver(113, this); // q-key
//        invaders.utils.keyhandler.removeKeyObserver(32, this); // space
        // Clean up keyhandlers of this controller.
        invaders.utils.keyhandler.observersReset();
        
        // And switch to next view/controller
        invaders.game.view = new invaders.view.Highscores();
        invaders.game.controller = new invaders.controller.Highscores(invaders.game.view,  score + (ships * 4000));
    }
    
    
    // Callback for keypress keyhandler
    this.notify = function(which) {
        if (which == 32 && !userMissile) {
            fireMissile(tank, -1);
        }
        if (which == 113) {
            gameOver();
        }  
    };
    // Which keys we are intressed in
    invaders.utils.keyhandler.addKeyObserver(32, this); //space
    invaders.utils.keyhandler.addKeyObserver(113, this); //q-key

    
    
    
    
    // Main logic which is pretty messy :)
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
            
            
          
           // If missile is user fired missile. Check if it is colliding with any of the enemies.
            if (missile.tankMissile) { 
                var shippHittedOnRow = fleat.checkCollision( userMissile.pos );
                if (shippHittedOnRow) {
                     missiles.remove(userMissile);
                     score += (shippHittedOnRow+1) * 1000;                 
                     userMissile = false;
                } else if ( userMissile.pos.bottom() < 0) {
                    // Clean up if of the screen
                     missiles.remove(userMissile);
                     userMissile = false;
                }
            }
            
            
            // If enemy missile and it is colliding with tank
            if (!missile.tankMissile && tank.pos.collide(missile.pos)) {
                tankExplode();
                break;
            }
            
            
            // Clean up enemy missiles which are of the screen
            if (missile.pos.top() > invaders.game.CONTEXT_H) {
                missiles.remove(missile);
            }
            
        }
        
        
        // Check if one of the fleat ships is colliding with cover 
        for (var j in covers.collection()) {
            covers.collection()[j].collideWithFleat(fleat);
        }
        

        // Check if one of the enimies collide with tank.
        if (fleat.checkCollision(tank.pos)) {
            tankExplode();
        }
        
        
        // Check if it is time to fleat fire a missile
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

