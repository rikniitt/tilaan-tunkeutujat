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



invaders.model.balls = {
    
   balls: [],
   
   move: function() {
        if (invaders.model.balls.balls.length == 0)
        {
            for (var i = 0; i < 5; i++)
                invaders.model.balls.balls.push( new invaders.model.Ball() );
        }
    
        for (var i in invaders.model.balls.balls)
        {
            var ball = invaders.model.balls.balls[i];
            ball.move();
        } 
   },
   
   render: function(context) {
        for (var i in invaders.model.balls.balls)
        {
            var ball = invaders.model.balls.balls[i];
            ball.render(context);
        }
   }
};




var view = new invaders.view.TitleScreen();
var controller = new invaders.controller.TitleScreen(view);



invaders.tick = function() {
    controller.tick();
    
    requestAnimFrame(invaders.tick);
};

