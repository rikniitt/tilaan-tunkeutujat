invaders.utils.sounds = (function() {
    
    var body = document.getElementsByTagName('body')[0];
    
    var sounds = new Array();
    var idPostFix = "_sound"
    
    
    function get(id) {
        return sounds[id + idPostFix];
    }
    
    function createAudio(path, id) {
        if ( get(id) )
            return;
        
        var audio = document.createElement('audio');
        audio.id = id + "_sound";
        
        var src = document.createElement('source');
        src.src = path;
        src.type = "audio/" + getAudioType(path);
        
        
        sounds[audio.id] = audio;
        
        audio.appendChild(src);
        
        body.appendChild(audio);
    }
    
    
    function getAudioType(path) {
       return path.substr( path.lastIndexOf(".") + 1, path.length + 1);
    }
    
    
    function loop(id) {
        
        var audio = get( id );
        
        if (!audio)
            throw "Can't play audio " + id +"!";
        
        audio.loop = "loop";
        audio.play();
    }
    
    function play(id) {
        var audio = get( id );
        if (!audio)
            throw "Can't play audio " + id +"!";
        
        get(id).play();
    }
    
    
    return {
        create : createAudio,
        play: play,
        loop: loop
    }
})();
