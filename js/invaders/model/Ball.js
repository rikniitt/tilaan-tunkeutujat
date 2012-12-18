invaders.model.Ball = function() {
    
//private:
    var randomD = function() {
        var d = Math.floor((Math.random()*6)+2);
        d = ((Math.floor(Math.random()*10) +1) % 2  == 0) ? d * -1 : d;
        return d;
    };  
    
//public:
    this.x = Math.floor(invaders.game.CONTEXT_W / 2);
    this.y = Math.floor(invaders.game.CONTEXT_H / 2);
  
    this.dx = randomD(); 
    this.dy = randomD();
    
    this.tick = function() {
        if( this.x < 0 || this.x > invaders.game.CONTEXT_W) 
            this.dx = -this.dx;

        if( this.y < 0 || this.y > invaders.game.CONTEXT_H) 
            this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;
    };
    
    this.render = function(context) {
        context.beginPath();
        context.fillStyle = "rgb(0,0,255)";
        context.arc(this.x, this.y, 20, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    };
};