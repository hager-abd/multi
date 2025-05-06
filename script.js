let mediaRecorder;
let recordedChunks = [];
let drawerOpen = false;

document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("preview")) {
        setupRecording();
    }
    if (document.getElementById("videosContainer")) {
        loadVideos();
    }
});

function loadVideos() {
    let videos = JSON.parse(localStorage.getItem("videos") || "[]");
    let container = document.getElementById("videosContainer");

    videos.forEach(videoSrc => {
        let video = document.createElement("video");
        video.src = videoSrc;
        video.controls = true;
        container.appendChild(video);
    });
}

function saveVideo(file) {
    let reader = new FileReader();
    reader.onload = function(event) {
        let videos = JSON.parse(localStorage.getItem("videos") || "[]");
        videos.push(event.target.result); 
        localStorage.setItem("videos", JSON.stringify(videos));
    };
    reader.readAsDataURL(file);  
}
function saveVideo(blob) {
    let reader = new FileReader();
    reader.onload = function(event) {
        let videos = JSON.parse(localStorage.getItem("videos") || "[]");
        videos.push(event.target.result);
        localStorage.setItem("videos", JSON.stringify(videos));
        window.location.href = "videos.html";
    };
    reader.readAsDataURL(blob);
}

function deleteVideos() {
    localStorage.removeItem("videos");
    document.getElementById("videosContainer").innerHTML = '';
    alert("Delete All Videos!!");
}

function setupRecording() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        document.getElementById("preview").srcObject = stream;
        mediaRecorder = new MediaRecorder(stream);
        
        mediaRecorder.ondataavailable = event => recordedChunks.push(event.data);
        
        mediaRecorder.onstop = () => {
            let videoBlob = new Blob(recordedChunks, { type: "video/mp4" });
            saveVideo(videoBlob);
            recordedChunks = [];
        };

        document.getElementById("startRecord").onclick = () => {
            mediaRecorder.start();
            document.getElementById("startRecord").disabled = true;
            document.getElementById("stopRecord").disabled = false;
        };

        document.getElementById("stopRecord").onclick = () => {
            mediaRecorder.stop();
            document.getElementById("startRecord").disabled = false;
            document.getElementById("stopRecord").disabled = true;
            //
            window.location.href = "videos.html"; 
        };
    });

    document.getElementById("videoInput").onchange = event => {
        let file = event.target.files[0];
        if (file) saveVideo(file);
    };
    document.getElementById("videoInput").onchange = event => {
                let file = event.target.files[0];
                if (file) {
                    saveVideo(file);
                    window.location.href = "videos.html";  
                }
            };
}
function toggleDrawer() {
    let drawer = document.querySelector(".drawer");
    drawerOpen = !drawerOpen;
    drawer.classList.toggle("open", drawerOpen);
}

//localStorage.clear();

