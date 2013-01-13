invaders.model.CoverShield = function(topX, topY) {
    
    var pixels = new Array();
    var pixelSize = 20;
    
    this.pos = new invaders.model.Position(topX, topY, pixelSize * 3, pixelSize * 4);
    
    
    
    
    for (var y = 0; y<4; y++) {
        pixels[y] = new Array();
        for (var x = 0; x<3; x++) {
            if ((y == 0 && x == 0) || (y == 0 && x == 2) || (y == 3 && x == 1)) {
                pixels[y][x] = false;
            } else {
                pixels[y][x] = new invaders.model.Position(this.pos.x +  (x * pixelSize), 
                                                            this.pos.y +  (y * pixelSize), 
                                                            pixelSize, 
                                                            pixelSize);
            }
            
        }
    }
    
  
    
    this.tick = function() {
        
    };
    
    this.render = function(context) {
        for (var y = 0; y<4; y++) {
            for (var x = 0; x<3; x++) {
                var pixel = pixels[y][x]; 
                if (pixel) {
                    context.beginPath();
                    context.fillStyle = "rgb(123,255,125)";
                    context.rect(pixel.x, pixel.y, pixel.w, pixel.h);
                    context.closePath();
                    context.fill();                    
                }
            }
        }
    };
    
    
    this.collide = function(otherPos) {
        if (this.pos.collide(otherPos)) {
            for (var y = 0; y<4; y++) {
                for (var x = 0; x<3; x++) {
                    var pixel = pixels[y][x];
                    if (pixel && pixel.collide(otherPos)) {
                        pixels[y][x] = false;
                        return true;
                    }
                }
            }
        }
        return false;
    };
    
    
    this.collideWithFleat = function(fleat) {
        
        for (var y = 0; y<4; y++) {
            for (var x = 0; x<3; x++) {
                var pixel = pixels[y][x];
                if (pixel && fleat.checkCollision(pixel)) {
                    pixels[y][x] = false;
                    return true;
                }
            }
        }
        
        return false;
    };
};