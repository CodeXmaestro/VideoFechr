const url = document.getElementById("url");
const loadingContainer = document.getElementById("loading-container");
const result = document.getElementById("result");
const iframe = document.getElementById("video");
const buttonContainer = document.querySelector("#result div");

const YOUTUBE = { name: "YouTube", color: "red", position: 0 }
const INSTAGRAM = { name: "Instagram", color: "#f4009c", position: 1 }
const FACEBOOK = { name: "Facebook", color: "#4867aa", position: 2 }

var currentSelection = 0;
var currentMedia = "YouTube";

function change(media) {

    let root = document.documentElement;
    let target = document.querySelectorAll("nav ul li");
    let targetedElement = document.getElementById("media")

    root.style.setProperty("--current-color", media.color);
    target[currentSelection].classList.remove("selected");

    currentSelection = media.position;
    target[currentSelection].classList.add("selected");

    currentMedia = media.name;
    targetedElement.innerHTML = currentMedia;

}

function sendRequest() {

    event.preventDefault();

    loadingContainer.style.visibility = "visible";
    loadingContainer.style.opacity = "1";

    showVideo();

    fetch("http://192.168.203.148:5000/videofechr", {

        method: "POST",
        body: JSON.stringify({

            name: currentMedia,
            url: url.value

        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
    .then(response => response.json())
    .then((response) => {

        console.log(response);

        if(response.status === 200) {

            let title = response.title
            let video = response.response;
            let audio = response.audio;

            for(let key in video) {

                let a = document.createElement("a");
                let button = document.createElement("button");

                a.href = video[key];
                a.target = "_blank"
                button.innerHTML = key;

                a.appendChild(button)
                buttonContainer.insertBefore(a, buttonContainer.firstChild);

            }

            let a = document.createElement("a");
            let button = document.createElement("button");

            a.href = audio;
            a.target = "_blank"
            button.innerHTML = "Download audio";

            a.appendChild(button)
            buttonContainer.appendChild(a);

        }else {

            alert("Something went wrong!");

        }

    });

}

function Close() {

    loadingContainer.style.opacity = "0";
    loadingContainer.style.visibility = "hidden";

}

function showVideo() {

    if(currentMedia === "YouTube") {

        id = url.value.split("/").pop();

        iframe.src = `https://www.youtube.com/embed/${id}`;

    }

}