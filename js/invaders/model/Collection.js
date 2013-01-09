invaders.model.Collection = function() {
    this.models = [];
    
    this.tick = function() {
        for (var i in this.models) {
            this.models[i].tick();
        }
    };
    
    this.render = function(context) {
        for (var i in this.models)
            this.models[i].render(context);
    };
    
    this.add = function(model) {
        this.models.push(model);
    };
    
    this.collection = function() {
        return this.models;
    };


    this.sortDesc = function() {
        this.models.sort(function(m1, m2) {
            return (m2.compareVal() - m1.compareVal());
        });
    };
    this.sortAsc = function() {
        this.models.sort(function(m1, m2) {
            return (m1.compareVal() - m2.compareVal());
        });
    };
    
    this.size = function() {
        return this.models.length;
    };
    
    this.serialize = function() {
        return JSON.stringify(this.models);
    };
};

