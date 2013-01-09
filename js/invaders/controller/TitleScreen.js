invaders.controller.TitleScreen = function(view) {
    
    var bgPos = 0;
    
    this.view = view;  
    this.models = new invaders.model.Collection();
    
    // populate models
    var flakes = new invaders.model.Collection();
    for (var i = 0; i < 15; i++)
        flakes.add( new invaders.model.Flake() );
    this.models.add(flakes);
    
//    var balls = new invaders.model.Collection();
//    for (var i = 0; i < 5; i++)
//        balls.add( new invaders.model.Ball() );
//    this.models.add(balls);
    
    
    this.models.add( new invaders.model.HeaderText() );  
    
    
    // register as space-key observer
    this.notify = function(keycode) {
        console.log(keycode);
        if (keycode == 32) {            
            invaders.game.view = new invaders.view.Highscores();
            invaders.game.controller = new invaders.controller.Highscores(invaders.game.view);
        } else if (keycode == 13) {
                        
            invaders.utils.keyhandler.removeKeyObserver(32, this); // space
            invaders.utils.keyhandler.removeKeyObserver(13, this); // return
            
            invaders.game.view = new invaders.view.Game();
            invaders.game.controller = new invaders.controller.Game(invaders.game.view);
        }
    };
    invaders.utils.keyhandler.addKeyObserver(32, this); // space
    invaders.utils.keyhandler.addKeyObserver(13, this); // return
    
    
    
    this.input = function() {
        
        var movement = invaders.utils.keyhandler.getMovement();
        
        for(var i in flakes.models)
            flakes.models[i].move(movement);
        
        // move background
        bgPos += movement[0] * 5;
        document.body.style.backgroundPosition = bgPos + "px 0";
    };
    
    this.logic = function() {    
        this.models.tick();
    };


    this.render = function() {
        this.view.render(this.models);
    };



    this.tick = function() {
        this.input();
        this.logic();
        this.render();
    };


};

