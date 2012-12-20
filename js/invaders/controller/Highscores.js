invaders.controller.Highscores = function(view) {

    
    this.view = view;  
    this.models = new invaders.model.Scores();
    
    

    
    this.input = function() {
        if (keyhandler.space()) {
            invaders.game.view = new invaders.view.TitleScreen();
            invaders.game.controller = new invaders.controller.TitleScreen(invaders.game.view);
            return;
        }
    };
    
    this.logic = function() {    
        this.models.tick();
    };


    this.render = function() {
        this.view.render(this.models.data.models);
    };



    this.tick = function() {
        this.input();
        this.logic();
        this.render();
    };


};

