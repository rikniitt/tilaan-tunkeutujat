$(document).ready(function() {
    invaders.tick();
}).keyup(function(e) {
    keyhandler.keyup(e.which);
}).keydown(function(e) {
    keyhandler.keydown(e.which);
});;
