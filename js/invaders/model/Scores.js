invaders.model.Scores = function() {
    var LIMIT = 10;
   
    
    this.add = function(score) {
        this.data.add(score);
        this.data.sortDesc();
        
        if(this.data.size() > LIMIT)
            this.data.models.pop();
    };
    
    
    this.getScores = function() {
        
        
        var scoresFromBackEnd = this.backend.getData();
        //console.log(scoresFromBackEnd);
        
        if (scoresFromBackEnd.length == 0) {
        
        

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
        } else {
            for (var i in scoresFromBackEnd) {
                this.add(new invaders.model.Score(scoresFromBackEnd[i].score, scoresFromBackEnd[i].name));
            }
        }
    };
    
    this.putScores = function() {
        this.backend.getData(this.data.serialize());
    }
    
     
    this.data = new invaders.model.Collection();
    this.backend = new invaders.utils.Backend("http://aqueous-ravine-5531.herokuapp.com/app/games/58/scores");
    this.getScores();
    
    this.putScores();
    
    this.highScore = function() {
        return this.data.collection()[0].score;
    };
    
    this.lowScore = function() {
        var data = this.data.collection();
        return data[data.length - 1].score;
    };
    
    this.scores = function() {
        return this.data.collection();
    };
    
    this.tick = function() {};
    this.render = function(context) {};
  
};