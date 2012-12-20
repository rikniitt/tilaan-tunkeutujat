invaders.view.TitleScreen = function() {
    
    this.canvasEl = invaders.game.CANVAS;
    this.context = invaders.game.CONTEXT;
    
       
    
    this.render = function(models) {
        
        this.context.clearRect(0, 0, invaders.game.CONTEXT_W, invaders.game.CONTEXT_H);

        for (var i in models) {
            //console.log(models[i]);
            models[i].render(this.context);
        }
        

        // get space weather forecast
        var rand = Math.random() * 1000;
        // there seems to be some problems in reception
        if (rand <= 50) {
            invaders.utils.glitch2d(this.canvasEl);
        }
    };
  
  
};

