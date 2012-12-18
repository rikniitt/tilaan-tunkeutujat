var glitch2d = function(canvas) {

    var context = canvas.getContext("2d");

    var width = canvas.width;
    var height = canvas.height;

    var glitchWidth = Math.floor(height/20);
    var glitchStartY = Math.floor(height/3) - Math.floor(glitchWidth/2);

    var iData = context.getImageData(0, 0, width, height);
    imageData = iData;

    function setPixel(imageData, x, y, r, g, b, a) {
             index = (x + y * imageData.width) * 4;
             imageData.data[index+0] = r;
             imageData.data[index+1] = g;
             imageData.data[index+2] = b;
             imageData.data[index+3] = a;
    }

    function getPixel(imageData, x, y) {
             index = (x + y * imageData.width) * 4;
                                    //[r, g, b, a]
             return [imageData.data[index+0], imageData.data[index+1], imageData.data[index+2], imageData.data[index+3]];	 
    }


    // create glitch aka. transfers pixels to left	
    for (var y =glitchStartY; y < (glitchStartY+glitchWidth); y++) {
            for (var x = 10; x < width; x++) {
                    var pixel = getPixel(imageData, x, y);
                    //console.log(pixel);
                    if (pixel[3] == 255) {
                            setPixel(imageData, x, y, 255, 255, 255, 255);
                            setPixel(imageData, x-10, y, pixel[0], pixel[1], pixel[2], 255);			
                    }

            }
    }

    // generate random noise
    for (var i = 0; i < 1000; i++) {
             x = Math.random() * width | 0;
             y = Math.random() * height | 0;
             r = Math.random() * 256 | 0;
             g = Math.random() * 256 | 0;
             b = Math.random() * 256 | 0;
             setPixel(imageData, x, y, r, g, b, 255); // 255 opaque
    }


    // clear context
    context.clearRect(0, 0, width, height);
    // and put "glitched" version back
    context.putImageData(imageData, 0, 0); // at coords 0,0
};