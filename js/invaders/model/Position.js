/**
 * Position for models.
 */
invaders.model.Position = function(x,y,w,h) {
    
    this.x = x; // x-position
    this.y = y; // y-position
    this.w = w; // width
    this.h = h; // height
    
    
    this.bottom = function() {
        return this.y + this.h;
    };
    
    this.top = function() {
        return this.y;
    };
    
    this.left = function() {
        return this.x;
    };
    
    this.right = function() {
        return this.x + this.w;
    };
    
    this.collide = function(otherPosition) {
        return !(this.bottom() < otherPosition.top() ||
                 this.top() > otherPosition.bottom() ||
                 this.left() > otherPosition.right() ||
                 this.right() < otherPosition.left());
    };
};