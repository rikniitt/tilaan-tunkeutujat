invaders.model.Missile = function(x, y, direction) {
    
    this.pos = new invaders.model.Position(x, y, 5, 25);
    
    this.direction = direction; // 1 down, -1 up
    
    this.tick = function() {
        this.pos.y += direction * 4;
    };
    
    this.render = function(context) {
        context.beginPath();
        context.fillStyle = "rgb(255,0,0)";
        context.rect(this.pos.x, this.pos.y, this.pos.w, this.pos.h);
        context.closePath();
        context.fill();
        
    };
};