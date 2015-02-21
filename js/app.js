var gmcomp, videocomp, voicerecogcomp, geocomp;
var done=false;
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
                videocomp.videoStart("userimage-"+cid);
                document.getElementById("userimage-"+e.detail.cid).addEventListener("mousedown", function(event){
                    var videoImage=videocomp.captureImage(cid);
                    gmcomp.storeImg2Data(videoImage.id, videoImage.img);  
                });
            });
        }
        document.getElementById("speech-start-"+e.detail.cid).addEventListener('mousedown', function(e) {
            var t=event.target.id.split("-");
            var cid=t[t.length-1];
            if(voicerecogcomp.getStatus()==false) {
                voicerecogcomp.start("speech-comment-"+cid);
            } else {
                var comment=voicerecogcomp.stop("speech-comment-"+cid);
                gmcomp.storeComment2Data(cid, comment);  
            }
        }.bind(e));
    });

    // current posistion
    document.getElementById("currentPos").addEventListener('mousedown', function(e) {
        geocomp.getLocation(function(event){
            gmcomp.putPositionByData(event.coords.latitude, event.coords.longitude);
        });
    });

    // emergency call
    document.getElementById("emergency").addEventListener('mousedown', function(event) {
        var emc=document.getElementById("emergencycall");
        emc.backdrop=true;
        emc.toggle();
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
        gmcomp.updateMarker("one", "秋葉神社");
    });
    document.addEventListener('close-infowindow', function(e) {
        document.getElementById("rec-fab").className=document.getElementById("rec-fab").className.replace("disp-rec-fab", "");
        document.getElementById("rec-fab").cid="";
        if(videocomp.getStatus==true) videocomp.videoStop();

        // // // //
        var id=e.detail.id;
        if(done==false) {
            if(id==0) {
                gmcomp.updateMarker("one", "柳森神社");
            } else if(id==1) {
                gmcomp.updateMarker("one", "神田明神");
            } else if(id==2) {
                gmcomp.updateMarker("one", "湯島天神");
            } else {
                gmcomp.updateMarker("all", "add");
                done=true;
            }
        }
    });

    
    // initialize
    mission.toggle();
    window.addEventListener('markers-ready', function(e) {
    });
    
});
