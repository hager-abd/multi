let drawerOpen = false;
function joinMeeting() {
    let username = document.getElementById("username").value.trim();
    let enteredID = document.getElementById("meetingID").value.trim();
    let storedID = localStorage.getItem("meetingID");

    if (!username || !enteredID) {
        alert("Please enter all data!!");
        return;
    }

    if (enteredID === storedID) {
       
        let participants = JSON.parse(localStorage.getItem("participants")) || {};

        
        if (participants[enteredID]) {
            participants[enteredID].push(username);
        } else {
           
            participants[enteredID] = [username];
        }

       
        localStorage.setItem("participants", JSON.stringify(participants));

        localStorage.setItem("participantName", username);

        window.location.href = "meeting.html";
    } else {
        document.getElementById("errorMessage").style.display = "block";
        document.getElementById("errorMessage").innerText = "Not correct please enter another id try again!!";
    }
}
function createMeeting() {
    let username = document.getElementById("username").value;
    if (!username.trim()) {
        alert("Enter your name please");
        return;
    }

    let meetingID = Math.random().toString(36).substr(2, 9);
    localStorage.setItem("meetingID", meetingID);
    localStorage.setItem("hostName", username);

    document.getElementById("meetingInfo").style.display = "block";
    document.getElementById("meetingInfo").innerHTML = `Done make meeting! ID: <strong>${meetingID}</strong> 
        <br>Share id to enter meeting`;

    
    setTimeout(() => {
        window.location.href = 'meeting.html';
    }, 10000);
}

document.addEventListener("DOMContentLoaded", () => {
    let storedID = localStorage.getItem("meetingID");
    let participants = JSON.parse(localStorage.getItem("participants")) || {};

   
    if (participants[storedID]) {
        participants[storedID].forEach(username => {
            
            let videoContainer = document.createElement("div");
            videoContainer.classList.add("video-container");

            
            let videoElement = document.createElement("video");
            videoElement.src = "path_to_dummy_video.mp4";
            videoElement.controls = true;
            videoElement.autoplay = true;
            videoElement.id = `video_${username}`; 

           
            let nameTag = document.createElement("div");
            nameTag.innerText = username;
            nameTag.classList.add("video-name");


            videoContainer.appendChild(nameTag);
            videoContainer.appendChild(videoElement);
            videoContainer.onclick = () => {
                endMeeting();  
            };

            document.getElementById("suvideo-container").appendChild(videoContainer);
        });
    }
    
});
function toggleDrawer() {
    let drawer = document.querySelector(".drawer");
    drawerOpen = !drawerOpen;
    drawer.classList.toggle("open", drawerOpen);
}


