invaders.controller.Game = function(view) {

    
    this.view = view;  
    this.models = new invaders.model.Collection();
    
    var fleat = new invaders.model.Fleat()
    this.models.add( fleat );
    
    var tank = new invaders.model.Tank();
    this.models.add( tank );
    
    var missiles = new invaders.model.Collection();
    this.models.add( missiles );
    
    

    function fireMissile(who) {
        
        var miss = new invaders.model.Missile(who.pos.x, who.pos.y, -1);
        console.log(miss);
        missiles.add(miss);
    }

    
    this.notify = function(which) {
        if (which == 32) {
            fireMissile(tank);
        } 
        
    };
    invaders.utils.keyhandler.addKeyObserver(32, this); //space

    
    
    
    
    this.logic = function() { 
        if (fleat.checkCollision(tank.pos))
            alert("ARE U WANNA DIE");
        
        this.models.tick();
    };


    this.render = function() {
        this.view.render(this.models);
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

