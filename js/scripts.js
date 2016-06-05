window.onload = function() {
  
    invaders.game.init(); 
    
    document.addEventListener('keypress', function(e) {
        invaders.utils.keyhandler.keypress(e.keyCode);
    }, false);
    
    document.addEventListener('keyup', function(e) {
        invaders.utils.keyhandler.keyup(e.keyCode);
    }, false);
    
    document.addEventListener('keydown', function(e) {
        invaders.utils.keyhandler.keydown(e.keyCode);
    }, false);
};
