invaders.utils.keyhandler = (function() {
    var keys = new Array();
    var i = 0;
    while(i < 256) {
        keys[i] = false;
        i = i + 1;
    }
    
    var keyObservers = new Array();
    
    function keypress(keycode) {
        if (keyObservers[keycode]) {
            for (var i in keyObservers[keycode]) {
                keyObservers[keycode][i].notify(keycode);
            }
        }
    }
    
    function addKeyObserver(keycode, observer) {
        if (!keyObservers[keycode])
            keyObservers[keycode] = new Array();
        
        keyObservers[keycode].push(observer);
    }
    
    function removeKeyObserver(keycode, observer) {
        if (keyObservers[keycode] && keyObservers[keycode].indexOf(observer) != -1)
            keyObservers[keycode].splice( keyObservers[keycode].indexOf(observer), 1 );
    }

    function up() {
        return keys[38] || keys[175] || keys[87];
    }

    function down() {
        return keys[40] || keys[176] || keys[83];
    }

    function left() {
        return keys[37] || keys[178] || keys[65];
    }

    function right() {
        return keys[39] || keys[177] || keys[68];
    }
    
    function space() {
        return keys[32];
    }
    
    function keydown(keycode) {
        keys[keycode] = true;
    }
    
    function keyup(keycode) {
        keys[keycode] = false;
    }

    function getMovement() {
        var movement = [0, 0];
        if(up()) {
            movement[1] = -1;
        }
        if(down()) {
            movement[1] = 1;
        }
        if(left()) {
            movement[0] = -1;
        }
        if(right()) {
            movement[0] = 1;
        }
        
        return movement;
    }

    return {
	up: up,
        down: down,
        left: left,
        right: right,
        
        keydown: keydown,
        keyup: keyup,
        getMovement: getMovement,
        
        space: space,
        keypress: keypress,
        addKeyObserver: addKeyObserver,
        removeKeyObserver: removeKeyObserver
    };
})();