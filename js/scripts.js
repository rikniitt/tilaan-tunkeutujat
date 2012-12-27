$(document).ready(function() {
    invaders.game.init();
}).keyup(function(e) {
    invaders.utils.keyhandler.keyup(e.which);
}).keydown(function(e) {
    invaders.utils.keyhandler.keydown(e.which);
}).keypress(function(e) {
    invaders.utils.keyhandler.keypress(e.which);
});
