invaders.controller.Highscores = function(view, newScore) {

    
    this.view = view; 
    
    var scores = new invaders.model.Scores();
    
    this.models = new invaders.model.Collection();
    this.models.add(scores);
    
    var scoreInput = false;
    var that = this;
    
    
    if (newScore >= scores.lowScore() ) {
        scoreInput = new invaders.model.ScoreInput(inputReady);
        that.models.add(scoreInput);           
    }
    
    function inputReady() {
        scores.add( new invaders.model.Score(newScore, scoreInput.input));
        that.models.remove(scoreInput);
        scoreInput = false;
        //scrores.putScores(); // save to server
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
    
    this.input = function() {
       
    };



    this.tick = function() {
        this.input();
        this.logic();
        this.render();
    };


};

