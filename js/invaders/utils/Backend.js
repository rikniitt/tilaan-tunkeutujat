/**
 * Saves and retrieves data from highscore backend.
 */
invaders.utils.Backend = function(serviceUrl) {
    
    function syncRequest(method, data) {
			
        var req = new XMLHttpRequest();
        
        req.open(method, serviceUrl, false);
        
        req.setRequestHeader("Content-type","application/json");
        req.setRequestHeader("Content-length", data.length);
        req.setRequestHeader("Connection", "close");

        req.send(data);

        if (req.readyState !== 4) {
            return false;
        }

        if (req.status !== 200) {
            return false;
        }

        //console.log("response tuli: " + req.responseText);
        return req.responseText;
    }

    function jsonStringToKeyValue(str) {
        var objs = JSON.parse(str);
        
        return objs;
    }
    
    
    function keyValueToJsonString(data) {
        return JSON.stringify(data);
    }
    
    
    this.getData = function() {
        var json = syncRequest("POST", "");
        return jsonStringToKeyValue(json);
     };

     this.postData = function(data) {
        var json = keyValueToJsonString(data);
        return syncRequest("PUT", json);
     };
};