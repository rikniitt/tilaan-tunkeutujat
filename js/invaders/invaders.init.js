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
    invaders.game.TITLE_CAPTION = "Avaruusvalloittaja peli";
    
    // Global container (used if now backend higscore service is available)
    invaders.game.SCORES = [];
    
    // Load all sounds
    invaders.utils.sounds.create("audio/explosion.wav", "tank_explosion");
    invaders.utils.sounds.create("audio/piu.wav", "tank_missile");
    invaders.utils.sounds.create("audio/argh.wav", "ship1_explosion");
    invaders.utils.sounds.create("audio/ouch.wav", "ship2_explosion");
    invaders.utils.sounds.create("audio/ough.wav", "ship3_explosion");
    
    
    // Set Main view and controller as current
    invaders.game.view = new invaders.view.TitleScreen();
    invaders.game.controller = new invaders.controller.TitleScreen(invaders.game.view);

    
    // Start the game 
    invaders.game.tick();
};


invaders.game.tick = function() {
    
    // Call tick of current controller
    invaders.game.controller.tick();

    requestAnimFrame(invaders.game.tick);
};