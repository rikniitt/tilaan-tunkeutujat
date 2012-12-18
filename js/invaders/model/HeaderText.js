invaders.model.HeaderText = function() {
   
//private:
    var text = "Tilaan Tunkeutujat";
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
        context.font = "25px 'Press Start 2P'";
        context.fillStyle = "cyan"
        context.fillText(part(), 102, 182);
        context.fillStyle = "white"
        context.fillText(part(), 100, 180);
    
        context.font = "15px 'Press Start 2P'";
        context.fillText("Tulossa pian...", 210, 250);
    };
    
    this.ticker = new invaders.model.Ticker(10, this.counterInc);
    
    this.tick = function() {
        this.ticker.tick();
    };
    
};