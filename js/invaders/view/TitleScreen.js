invaders.view.TitleScreen = function() {
    
    this.canvasEl = invaders.game.CANVAS;
    this.context = invaders.game.CONTEXT;
    
       
    
    this.render = function(models) {
        
        this.context.clearRect(0, 0, invaders.game.CONTEXT_W, invaders.game.CONTEXT_H);


        models.render(this.context);
        

        this.context.font = "12px 'Press Start 2P'";
        this.context.fillText("Return aloita peli tai space ennätyslista.", 50, 470); 
        

        // get space weather forecast
        var rand = Math.random() * 1000;
        // there seems to be some problems in reception
        if (rand <= 50) {
            invaders.utils.glitch2d(this.canvasEl);
        }
    };
  
  
};

