invaders.model.ScoreInput = function(readyCallback) {
    this.input = "";
    
    this.curChar = 65;

    var that = this;
    
    var scoreInputTicker = new invaders.model.Ticker(15, move);
    

    function move() {
        
        var movement = invaders.utils.keyhandler.getMovement();
        
        that.curChar += movement[1];
        
        if (that.curChar < 65) that.curChar = 90;
        if (that.curChar > 90) that.curChar = 65;
        
        if (movement[0] == 1)
            that.put();
        
        
        console.log(that.input);
    };
    
    this.put = function() {
        that.input += String.fromCharCode( that.curChar ); 
        if (that.input.length >= 3)
            readyCallback();
    };
    
    this.tick = function() {
         
       scoreInputTicker.tick();
    };
    
    this.render = function(context) {
        context.font = "16px 'Press Start 2P'";
        context.fillText("Syötä nimimerkkisi: " + that.input + String.fromCharCode( that.curChar ), 150, 370); 
        context.font = "10px 'Press Start 2P'";
        context.fillText("Ylös-alas: Vaihda kirjainta. Vasemmalle: Hyväksy kirjain.", 20, 390); 
    };
};