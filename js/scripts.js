$(document).ready(function() {
    invaders.game.init();
}).keyup(function(e) {
    keyhandler.keyup(e.which);
}).keydown(function(e) {
    keyhandler.keydown(e.which);
});;
