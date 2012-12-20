invaders.view.TitleScreen = function() {
    
    this.canvasEl = document.getElementById("invaders");
    this.context = this.canvasEl.getContext("2d");
    
       
    
    this.render = function(models) {
        
        this.context.clearRect(0, 0, 640, 480);

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

