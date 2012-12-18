invaders.controller.TitleScreen = function(view) {
    
    var bgPos = 0;
    
    this.view = view;  
    this.models = new invaders.model.Collection();
    
    
    
    var flakes = new invaders.model.Collection();
    for (var i = 0; i < 15; i++)
        flakes.add( new invaders.model.Flake() );
    this.models.add(flakes);
    
//    var balls = new invaders.model.Collection();
//    for (var i = 0; i < 5; i++)
//        balls.add( new invaders.model.Ball() );
//    this.models.add(balls);
    
    
    this.models.add( new invaders.model.HeaderText() );  
    
    this.input = function() {
        
        if (keyhandler.space()) {
            invaders.game.view = new invaders.view.Highscores();
            invaders.game.controller = new invaders.controller.Highscores(invaders.game.view);
            return;
        }
        
        var movement = keyhandler.getMovement();
        
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
        this.view.render(this.models.models);
    };



    this.tick = function() {
        this.input();
        this.logic();
        this.render();
    };


};

