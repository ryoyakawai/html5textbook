var gmcomp, videocomp, voicerecogcomp, geocomp;
window.addEventListener('polymer-ready', function(e) {

    // for map
    gmcomp=document.getElementById("googlemap-comp");

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
            document.getElementById("video-start-"+e.detail.cid).addEventListener("mousedown", function(event){
                var t=event.target.id.split("-");
                var cid=t[t.length-1];
                console.log(videocomp);
                videocomp.videoStart("userimage-"+cid);
                document.getElementById("userimage-"+e.detail.cid).addEventListener("mousedown", function(event){
                    var videoImage=videocomp.captureImage(cid);
                    gmcomp.storeImg2Data(videoImage.id, videoImage.img);  
                });
            });
        }
        document.getElementById("speech-start-"+e.detail.cid).addEventListener('mousedown', function(e) {
            if(voicerecogcomp.getStatus()==false) {
                voicerecogcomp.start("speech-comment-"+this.detail.cid);
            } else {
                voicerecogcomp.stop();
            }
        }.bind(e));
    });
    document.addEventListener('close-infowindow', function(e) {
        document.getElementById("rec-fab").className=document.getElementById("rec-fab").className.replace("disp-rec-fab", "");
        document.getElementById("rec-fab").cid="";
        if(videocomp.getStatus==true) videocomp.videoStop();
    });

    // for recognition
    videocomp=document.getElementById("video-comp");

    // for recognition
    voicerecogcomp=document.getElementById("voicerecog-comp");
    
    // geolocation
    geocomp=document.getElementById("geolocation-comp");


    // main
    var mission=document.querySelector("#missionstatement");
    mission.backdrop=true;
    var mission2=document.querySelector("#missionstatement2");
    mission2.backdrop=true;
    mission.addEventListener("core-overlay-close-completed", function(event){
        mission2.toggle();
    });
    mission2.addEventListener("core-overlay-close-completed", function(event){
        gmcomp.updateMarker("add", "神田明神");
        gmcomp.updateMarker("add", "湯島天神");
        gmcomp.updateMarker("add", "秋葉神社");
        gmcomp.updateMarker("add", "柳森神社");
    });

    // initialize
    mission.toggle();
    window.addEventListener('markers-ready', function(e) {
    });
    
});
