invaders.view.Highscores = function() {
    
    this.canvasEl = invaders.game.CANVAS;
    this.context = invaders.game.CONTEXT;
    
       
    
    this.render = function(models) {
        
        this.context.clearRect(0, 0, invaders.game.CONTEXT_W, invaders.game.CONTEXT_H);

        
        
        this.context.font = "25px 'Press Start 2P'";
        this.context.fillStyle = "cyan"
        this.context.fillText("Ennnätykset", 182, 100); // Harcoded position for now :)
        this.context.fillStyle = "white"
        this.context.fillText("Ennnätykset", 180, 100); // Harcoded position for now :)
        
        
        this.context.font = "15px 'Press Start 2P'";
        var x = 200;
        var y = 140;
        for (var i = 0; i<models.length; i++) {
            var pos = i + 1;
            if (pos<10) 
                pos = "0"+pos;
            var name = models[i].name;
            var score = models[i].score;
            
            this.context.fillText(pos + ".  " + name + "  " + score, x, (y + i * 20)); 
        }


    };
  
  
};
