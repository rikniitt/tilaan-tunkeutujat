invaders.model.Flake = function() {

//private:
    var randomX = function() { 
        return Math.floor((Math.random()*640)); 
    };
    
    var randomY = function() { 
        return Math.floor((Math.random()*480)); 
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
        if (this.y > 480)
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
        if (this.x > 640) this.x = 0;
        if (this.x < 0) this.x = 640;

    };
    
    this.render = function(context) {
        context.fillStyle = "rgb(255,255,255)";
        context.fillRect(this.x, this.y, this.size, this.size);
    };
};