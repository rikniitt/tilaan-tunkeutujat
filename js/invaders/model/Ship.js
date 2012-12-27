invaders.model.Ship = function(x,y) {
    
//private:
    
    
//public:
    this.x = x;
    this.y = y;
  
    
    this.tick = function() {
        
        
        this.y += 20;
    };
    
    this.render = function(context) {
        context.beginPath();
        context.fillStyle = "rgb(0,0,255)";
        context.rect(this.x, this.y, 20, 20);
        context.closePath();
        context.fill();
    };
};