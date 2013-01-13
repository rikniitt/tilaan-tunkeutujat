invaders.model.HeaderText = function() {
   
//private:
    var text = invaders.game.TITLE_TEXT;
    var counter = 1;
        
    var part = function() {               
        return text.substr(0, counter);
    };
        
        
//public:  
    this.counterInc = function() {
        counter++;
        if (counter > text.length + 4) // +4 let it be visible for sometime
            counter = 1;
        
    };
        
    this.render = function(context) {
        context.font = "30px 'Press Start 2P'";
        context.fillStyle = "cyan"
        context.fillText(part(), 52, 82); // Harcoded position for now :)
        context.fillStyle = "white"
        context.fillText(part(), 50, 80); // Harcoded position for now :)
    
        context.font = "15px 'Press Start 2P'";
        context.fillText(invaders.game.TITLE_CAPTION, 
                        130, 
                        110); // Harcoded position for now :)
    };
    
    this.ticker = new invaders.model.Ticker(10, this.counterInc);
    
    this.tick = function() {
        this.ticker.tick();
    };
    
};