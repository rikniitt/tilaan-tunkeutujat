var invaders = {};
invaders.settings = {};
invaders.domain = {};
invaders.input = function() {};
invaders.logic = function() {};
invaders.render = function() {};
invaders.tick = function() {
    invaders.input();
    invaders.logic();
    invaders.render();
};

