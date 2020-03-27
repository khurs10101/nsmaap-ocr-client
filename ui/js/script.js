(function () {
    var scale;
    var imgDiv = document.getElementById("ocrImg");
    var imgWidth = imgDiv.width;
    scale = imgWidth;
    document.getElementById("zoomin").addEventListener("click", function(){ 
        scale += 150;
        imgDiv.width = scale;
    }); 

    document.getElementById("zoomout").addEventListener("click", function(){ 
        scale -= 150;
        imgDiv.width = scale;
    }); 
})();