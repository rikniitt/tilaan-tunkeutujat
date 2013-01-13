invaders.view.Game = function() {
    
    this.canvasEl = invaders.game.CANVAS;
    this.context = invaders.game.CONTEXT;
    
       
    
    this.render = function(models, score, ships) {
        
        this.context.clearRect(0, 0, invaders.game.CONTEXT_W, invaders.game.CONTEXT_H);

        
        
        this.context.font = "12px 'Press Start 2P'";
        this.context.fillStyle = "white"
        this.context.fillText("Pisteet " + score, 10, 20); // Harcoded position for now :)
        this.context.fillText("Alukset " + ships, 300, 20); // Harcoded position for now :)
        
        
        
        
//        for (var i in models) {
//            models[i].render(this.context);
//        }
        models.render(this.context);


    };
  
  
};
