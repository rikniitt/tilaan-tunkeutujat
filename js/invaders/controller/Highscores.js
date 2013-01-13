invaders.controller.Highscores = function(view, newScore) {

    
    this.view = view;  
    this.models = new invaders.model.Scores();
    
    
    
    if (newScore >= this.models.lowScore() ) {
        this.models.add(new invaders.model.Score(newScore, "AAA"));
        //this.models.putScores();
    }
    
    

    
    this.notify = function() {
        invaders.utils.keyhandler.observersReset();
        
        invaders.game.view = new invaders.view.TitleScreen();
        invaders.game.controller = new invaders.controller.TitleScreen(invaders.game.view);
    };
    invaders.utils.keyhandler.addKeyObserver(32, this);
    
    this.logic = function() {    
        this.models.tick();
    };


    this.render = function() {
        this.view.render(this.models);
    };
    
    this.input = function() {};



    this.tick = function() {
        this.input();
        this.logic();
        this.render();
    };


};

