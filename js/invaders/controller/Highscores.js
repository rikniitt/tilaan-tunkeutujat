invaders.controller.Highscores = function(view) {

    
    this.view = view;  
    this.models = new invaders.model.Scores();
    
    

    
    this.notify = function() {
        invaders.game.view = new invaders.view.TitleScreen();
        invaders.game.controller = new invaders.controller.TitleScreen(invaders.game.view);
    };
    invaders.utils.keyhandler.addKeyObserver(32, this);
    
    this.logic = function() {    
        this.models.tick();
    };


    this.render = function() {
        this.view.render(this.models.data.models);
    };
    
    this.input = function() {};



    this.tick = function() {
        this.input();
        this.logic();
        this.render();
    };


};
