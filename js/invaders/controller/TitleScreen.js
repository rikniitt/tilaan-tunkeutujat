invaders.controller.TitleScreen = function(view) {
    
    var bgPos = 0;
    
    this.view = view;
      
    this.models = new invaders.model.Collection();
    this.models.add( new invaders.model.HeaderText() );  
    
    var flakes = new invaders.model.Collection();
    for (var i = 0; i < 15; i++)
        flakes.add( new invaders.model.Flake() );
    
    this.models.add(flakes);
    
    
    this.input = function() {
        var movement = keyhandler.getMovement();
        
        for(var i in flakes.models)
            flakes.models[i].move(movement);
        
        // move background
        bgPos += movement[0] * 5;
        $("body").css("backgroundPosition", bgPos + "px 0");
    };
    
    this.logic = function() {    
        //invaders.domain.balls.move(); 
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

