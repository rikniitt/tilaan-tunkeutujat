invaders.model.Ball = function() {
    
//private:
    var randomD = function() {
        var d = Math.floor((Math.random()*6)+2);
        d = ((Math.floor(Math.random()*10) +1) % 2  == 0) ? d * -1 : d;
        return d;
    };  
    
//public:
    this.x = 315;
    this.y = 235,
  
    this.dx = this.randomD(); 
    this.dy = this.randomD();
    
    this.move = function() {
        if( this.x < 0 || this.x > 640) 
            this.dx = -this.dx;

        if( this.y < 0 || this.y > 480) 
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