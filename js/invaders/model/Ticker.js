/**
 * Helper class to slow down animation.
 */
invaders.model.Ticker = function(limit, onTick) {
  var ticks = 0;
  var limit = limit;
  var onTick = onTick;

   this.tick = function(){
       ticks++;
       ticks %= limit;
       if (ticks == 0)
           onTick();
   }
};

