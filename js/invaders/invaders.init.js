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





invaders.game.init = function() {
    
    // settigs
    invaders.game.CANVAS = document.getElementById("invaders");
    invaders.game.CONTEXT = invaders.game.CANVAS.getContext("2d");
    invaders.game.CONTEXT_W = invaders.game.CANVAS.width;
    invaders.game.CONTEXT_H = invaders.game.CANVAS.height;
    
    invaders.game.TITLE_TEXT = "Tilaan Tunkeutujat";
    invaders.game.TITLE_CAPTION = "Tulossa pian...(kohta)";

    invaders.game.view = new invaders.view.TitleScreen();
    invaders.game.controller = new invaders.controller.TitleScreen(invaders.game.view);
    
    //var a = new invaders.model.Scores();
    
    invaders.game.tick();
};

invaders.game.tick = function() {
    invaders.game.controller.tick();
    
    requestAnimFrame(invaders.game.tick);
};