/**
* Dropping flake in titlescreen.
*/
invaders.model.Flake = function() {

//private:
    var randomX = function() { 
        return Math.floor((Math.random() * invaders.game.CONTEXT_W)); 
    };
    
    var randomY = function() { 
        return Math.floor((Math.random() * invaders.game.CONTEXT_H)); 
    };
    
    var randomSize = function() { 
        return Math.floor((Math.random()*5) + 1) * 2; 
    };

//public:
    this.x = randomX();
    this.y = randomY();
    this.size = randomSize();
    this.speed = this.size;
    
    
    this.tick = function() {
        // drop
        this.y += this.speed * 1;
        if (this.y > invaders.game.CONTEXT_H)
        {
            this.x = randomX();
            this.y = 0;
            this.size = randomSize();
            this.speed = this.size;
        }
    };
    
    this.move = function(movement) { 

        var x = movement[0];
        var y = movement[1];

        // pan
        this.x += this.speed * x;    
        if (this.x > invaders.game.CONTEXT_W) this.x = 0;
        if (this.x < 0) this.x = invaders.game.CONTEXT_W;

    };
    
    this.render = function(context) {
        context.fillStyle = "rgb(255,255,255)";
        context.fillRect(this.x, this.y, this.size, this.size);
    };
};