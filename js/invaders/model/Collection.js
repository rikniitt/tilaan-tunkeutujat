invaders.model.Collection = function() {
    this.models = [];
    
    this.tick = function() {
        for (var i in this.models)
            this.models[i].tick();
    };
    
    this.render = function(context) {
        for (var i in this.models)
            this.models[i].render(context);
    };
    
    this.add = function(model) {
        this.models.push(model);
    }
};

