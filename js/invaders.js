window.requestAnimFrame = (function(){
    return window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function(callback, element){
        window.setTimeout(callback, 1000 / 60);
    };
})();

var invaders = {};


invaders.settings = {};


invaders.domain = {
    headerText : {
        text : "Tilaan Tunkeutujat",
        counter : 1,
        part : function() {               
            return invaders.domain.headerText.text.substr(0, invaders.domain.headerText.counter);
        },
        counterInc : function() {
            invaders.domain.headerText.counter++;
            if (invaders.domain.headerText.counter > invaders.domain.headerText.text.length + 4) // +4 let it be visible for sometime
                invaders.domain.headerText.counter = 1;
            setTimeout(invaders.domain.headerText.counterInc, 200);
        },
        render: function(context) {
            context.font = "25px 'Press Start 2P'";
            context.fillStyle = "cyan"
            context.fillText(invaders.domain.headerText.part(), 102, 182);
            context.fillStyle = "white"
            context.fillText(invaders.domain.headerText.part(), 100, 180);
    
            context.font = "15px 'Press Start 2P'";
            context.fillText("Tulossa pian...", 210, 250);
        }
    }
};


invaders.domain.Flake = function() {
    this.x = this.randomX();
    this.y = 0;
    this.size = this.randomSize();
    this.speed = this.size;
};
invaders.domain.Flake.prototype.randomX = function() { return Math.floor((Math.random()*640)); };
invaders.domain.Flake.prototype.randomSize = function() { return Math.floor((Math.random()*5) + 1) * 2; };
invaders.domain.Flake.prototype.drop = function() { 
    this.y += this.speed;
    
    if (this.y > 480)
    {
        this.x = this.randomX();
        this.y = 0;
        this.size = this.randomSize();
        this.speed = this.size;
    }
};
invaders.domain.Flake.prototype.render = function(context) {
    context.fillStyle = "rgb(255,255,255)";
    context.fillRect(this.x, this.y, this.size, this.size);
};
invaders.domain.flakes = {
   flakes: [],
   
   drop: function() {
        if (invaders.domain.flakes.flakes.length == 0)
        {
            for (var i = 0; i < 25; i++)
                invaders.domain.flakes.flakes.push( new invaders.domain.Flake() );
        }
    
        for (var i in invaders.domain.flakes.flakes)
        {
            var flake = invaders.domain.flakes.flakes[i];
            flake.drop();
        } 
   },
   
   render: function(context) {
        for (var i in invaders.domain.flakes.flakes)
        {
            var flake = invaders.domain.flakes.flakes[i];
            flake.render(context);
        }
   } 
};





invaders.domain.Ball = function() {
  this.x = 315;
  this.y = 235,
  
  this.dx = this.randomD(); 
  this.dy = this.randomD();
}
invaders.domain.Ball.prototype.randomD = function() {
    var d = Math.floor((Math.random()*6)+2);
    d = ((Math.floor(Math.random()*10) +1) % 2  == 0) ? d * -1 : d;
    return d;
};
invaders.domain.Ball.prototype.move = function() {
    if( this.x < 0 || this.x > 640) 
        this.dx = -this.dx;

    if( this.y < 0 || this.y > 480) 
        this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;
};
invaders.domain.Ball.prototype.render = function(context) {
    context.beginPath();
    context.fillStyle = "rgb(0,0,255)";
    context.arc(this.x, this.y, 20, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
};
invaders.domain.balls = {
    
   balls: [],
   
   move: function() {
        if (invaders.domain.balls.balls.length == 0)
        {
            for (var i = 0; i < 5; i++)
                invaders.domain.balls.balls.push( new invaders.domain.Ball() );
        }
    
        for (var i in invaders.domain.balls.balls)
        {
            var ball = invaders.domain.balls.balls[i];
            ball.move();
        } 
   },
   
   render: function(context) {
        for (var i in invaders.domain.balls.balls)
        {
            var ball = invaders.domain.balls.balls[i];
            ball.render(context);
        }
   }
};




invaders.input = function() {};



invaders.logic = function() {    
    //invaders.domain.balls.move(); 
    invaders.domain.flakes.drop();
};



invaders.render = function() {
    var context = document.getElementById("invaders").getContext("2d"); 
    context.clearRect(0, 0, 640, 480);

    //invaders.domain.balls.render(context);
    invaders.domain.flakes.render(context);
    
    invaders.domain.headerText.render(context);

};

invaders.tick = function() {
    invaders.input();
    invaders.logic();
    invaders.render();
    
    requestAnimFrame(invaders.tick);
};

