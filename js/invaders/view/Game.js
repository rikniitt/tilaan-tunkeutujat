invaders.view.Game = function() {
    
    this.canvasEl = invaders.game.CANVAS;
    this.context = invaders.game.CONTEXT;
    
       
    
    this.render = function(models) {
        
        this.context.clearRect(0, 0, invaders.game.CONTEXT_W, invaders.game.CONTEXT_H);

        
        
        this.context.font = "25px 'Press Start 2P'";
        this.context.fillStyle = "cyan"
        this.context.fillText("PELI", 182, 100); // Harcoded position for now :)
        this.context.fillStyle = "white"
        this.context.fillText("PELI", 180, 100); // Harcoded position for now :)
        
        for (var i in models) {
            models[i].render(this.context);
        }


    };
  
  
};
