/**
 * Enemy and tank missile
 */
invaders.model.Missile = function(x, y, direction) {
    
    this.pos = new invaders.model.Position(x, (y + (direction * Math.floor(25))), 5, 20);
    
    this.direction = direction; // 1 down, -1 up
    this.tankMissile = (direction === 1) ? false : true;
    
    this.tick = function() {
        this.pos.y += direction * 5;
    };
    
    this.render = function(context) {
        context.beginPath();
        context.fillStyle = "rgb(255,255,255)";
        context.rect(this.pos.x, this.pos.y, this.pos.w, this.pos.h);
        context.closePath();
        context.fill();
        
    };
};