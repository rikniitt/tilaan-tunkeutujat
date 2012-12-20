invaders.model.Scores = function() {
    var LIMIT = 10;
    
    this.data = new invaders.model.Collection();
    
    this.add = function(score) {
        this.data.add(score);
        this.data.sortDesc();
        
        if(this.data.size() > LIMIT)
            this.data.models.pop();
    };
    
    // devel data
    this.add(new invaders.model.Score("100", "PMS"));
    this.add(new invaders.model.Score("1000", "1AasMASDS"));
    this.add(new invaders.model.Score("150", "JQW"));
    this.add(new invaders.model.Score("250", "AXE"));
    this.add(new invaders.model.Score("350", "JHN"));
    this.add(new invaders.model.Score("500", "MIC"));
    this.add(new invaders.model.Score("750", "STV"));
    this.add(new invaders.model.Score("50", "MIN"));
    this.add(new invaders.model.Score("800", "RYE"));
    this.add(new invaders.model.Score("900", "FGH"));
    this.add(new invaders.model.Score("200", "ASD"));
    //console.log(this.data);
    
    this.tick = function() {};
    this.render = function(context) {};
  
};