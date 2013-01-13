/**
 * One higscore record
 */
invaders.model.Score = function(score, name) {
    this.score = score;
    this.name = name.replace(/[^A-Z]/g, "").substr(0, 3);
    
    this.compareVal = function() {
        return this.score;
    };
};