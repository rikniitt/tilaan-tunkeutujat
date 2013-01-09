invaders.model.Ship = function(x,y) {
    
//private:
    
    
//public:
    
    this.pos = new invaders.model.Position(x, y, 20, 20)
  
    
    this.tick = function() {
        this.pos.y += 20;
    };
    
    this.render = function(context) {
        context.beginPath();
        context.fillStyle = "rgb(0,0,255)";
        context.rect(this.pos.x, this.pos.y, this.pos.w, this.pos.h);
        context.closePath();
        context.fill();
    };
};