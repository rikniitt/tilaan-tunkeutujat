/**
 * User controlled tank
 */
invaders.model.Tank = function() {

    
    this.pos = new invaders.model.Position(300, 440, 30, 30);

    this.tick = function() {};
    
    this.render = function(context) {
        context.beginPath();
        context.fillStyle = "rgb(0,255,0)";
        context.rect(this.pos.x, this.pos.y, this.pos.w, this.pos.h);
        context.closePath();
        context.fill();
        
    };
    
    this.move = function(movement) {
        var newX = this.pos.x + (movement[0] * 3);
        
        if (newX > 5 && newX < invaders.game.CONTEXT_W - 35)
            this.pos.x = newX;
    };
};

