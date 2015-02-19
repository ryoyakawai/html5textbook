var gmcomp;
var videocomp;
var voicerecogcomp;
window.addEventListener('polymer-ready', function(e) {

    // for map
    gmcomp=document.getElementById("googlemap-comp");
    document.getElementById("marker-on-all").addEventListener("mousedown", function(event){
        gmcomp.updateMarker("all", "add");
    });
    document.getElementById("marker-off-all").addEventListener("mousedown", function(event){
        gmcomp.updateMarker("all", "remove");
    });
    document.getElementById("marker-on-A").addEventListener("mousedown", function(event){
        gmcomp.updateMarker("add", "AAA");
    });
    document.getElementById("marker-one-A").addEventListener("mousedown", function(event){
        gmcomp.updateMarker("one", "AAA");
    });
    document.getElementById("marker-off-A").addEventListener("mousedown", function(event){
        gmcomp.updateMarker("remove", "AAA");
    });
    document.getElementById("marker-on-B").addEventListener("mousedown", function(event){
        gmcomp.updateMarker("add", "BBB");
    });
    document.getElementById("marker-one-B").addEventListener("mousedown", function(event){
        gmcomp.updateMarker("one", "BBB");
    });
    document.getElementById("marker-off-B").addEventListener("mousedown", function(event){
        gmcomp.updateMarker("remove", "BBB");
    });
    document.getElementById("marker-on-C").addEventListener("mousedown", function(event){
        gmcomp.updateMarker("add", "CCC" );
    });
    document.getElementById("marker-one-C").addEventListener("mousedown", function(event){
        gmcomp.updateMarker("one", "CCC");
    });
    document.getElementById("marker-off-C").addEventListener("mousedown", function(event){
        gmcomp.updateMarker("remove", "CCC");
    });


    // for camera
    videocomp=document.getElementById("video-comp");
    document.getElementById("video-start").addEventListener("mousedown", function(event){
        videocomp.videoStart();
    });

    document.getElementById("rec-fab").addEventListener("mousedown", function(event){
        console.log("[start recording] ", event.target.cid);
        videocomp.videoStart("userimage");
        // hide only button
        document.getElementById("rec-fab").className=document.getElementById("rec-fab").className.replace("disp-rec-fab", "");
        document.getElementById("userimage").addEventListener("mousedown", function(event){
            var videoImage=videocomp.captureImage(this.target.cid);
            gmcomp.storeImg2Data(videoImage.id, videoImage.img);  
            console.log("BBBB", this.target.cid);
        }.bind(event));
    });

    // infowindow & rec button
    document.addEventListener('open-infowindow', function(e) {
        if(e.detail.imgExists==false) {
            // hide and delete cid
            document.getElementById("rec-fab").className+=" disp-rec-fab";
            document.getElementById("rec-fab").cid=e.detail.cid;
        }
    });
    document.addEventListener('close-infowindow', function(e) {
        document.getElementById("rec-fab").className=document.getElementById("rec-fab").className.replace("disp-rec-fab", "");
        document.getElementById("rec-fab").cid="";
        videocomp.videoStop();
    });

    // for recognition
    voicerecogcomp=document.getElementById("voicerecog-comp");
    document.getElementById("recognition-start").addEventListener('mousedown', function(e) {
        voicerecogcomp.startContinuous("recog-result");
    });
    document.getElementById("recognition-stop").addEventListener('mousedown', function(e) {
        voicerecogcomp.stop();
    });    


    
    // initialize
    window.addEventListener('markers-ready', function(e) {
        gmcomp.updateMarker("all", "add");
    });
    
});
