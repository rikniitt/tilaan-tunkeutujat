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

invaders.domain = {};

invaders.domain.Ball = function() {
  this.x = 315;
  this.y = 235,
  
  this.dx = Math.floor((Math.random()*10)+1) - 5; 
  if (this.dx == 0) this.dx++;
  
  this.dy = Math.floor((Math.random()*10)+1) - 5; 
  if (this.dy == 0) this.dy++;
}
invaders.domain.balls = {
   balls: []  
};

invaders.input = function() {};

invaders.logic = function() {
    
    if (invaders.domain.balls.balls.length == 0)
    {
        for (var i = 0; i < 5; i++)
            invaders.domain.balls.balls.push( new invaders.domain.Ball() );
    }
    
    for (var i in invaders.domain.balls.balls)
    {
        var ball = invaders.domain.balls.balls[i];

        if( ball.x < 0 || ball.x > 640) 
            ball.dx = -ball.dx;

        if( ball.y < 0 || ball.y > 480) 
            ball.dy = -ball.dy;

        ball.x += ball.dx;
        ball.y += ball.dy;
        
        //invaders.domain.balls.balls[i] = ball;
    }
    
};

invaders.render = function() {
    var context = document.getElementById("invaders").getContext("2d");  

    context.clearRect(0, 0, 640, 480);

    for (var i in invaders.domain.balls.balls)
    {
        var ball = invaders.domain.balls.balls[i];

        context.beginPath();
        context.fillStyle="#ffffff";


        context.arc(
                  ball.x, 
                  ball.y,
                  20, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }
};

invaders.tick = function() {
    invaders.input();
    invaders.logic();
    invaders.render();
    
    requestAnimFrame(invaders.tick);
};

