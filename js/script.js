let songs;
let currentSong = new Audio();
let currFolder;
let cardContainer = document.querySelector(".cardContainer")

//Function for converting seconds to 00:00 format...
function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    const formattedMins = String(mins).padStart(2, "0");
    const formattedSecs = String(secs).padStart(2, "0");

    return `${formattedMins}:${formattedSecs}`;
}

async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:5500/${folder}/`)
    let response = await a.text();

    let div = document.createElement("div")
    div.innerHTML = response;

    let as = div.getElementsByTagName("a")
    songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3.preview")) {

            songs.push(element.href.split(`/${folder}/`)[1].replace(".preview", ""))
        }

    }


    //Displaying in the library...
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `
         <div class="info flex">
                            <img class = "invert" src="img/music-note-03-stroke-rounded.svg" alt="music">
                            <li> ${song.replaceAll("%20", " ")}</li>
                            <img class = "invert" src="img/play.svg" alt="play">
                        </div>`
    }


    //Playing song...

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {

        e.addEventListener("click", element => {
            playMusic(e.innerHTML.trim());
        })

    })




}

//Play function...
function playMusic(track, pause = false) {
    currentSong.src = `/${currFolder}/` + track

    if (!pause) {
        currentSong.play();
        play.src = "img/pause-stroke-rounded.svg"
    }

    document.querySelector(".songInfo").innerHTML = decodeURI(track);
    document.querySelector(".songDuration").innerHTML = "00:00 / 00:00";


}

//Function to display all the albums on the page...

async function displayAlbums() {

    let a = await fetch(`http://127.0.0.1:5500/songs/`)
    let response = await a.text();

    let div = document.createElement("div")
    div.innerHTML = response;

    let anchors = div.getElementsByTagName("a")
    let folder = [];

    let array = Array.from(anchors)

        for (let index = 0; index < array.length; index++) {
            const e = array[index];
            
        let href = e.getAttribute("href")

        if (href.includes("/songs/") && !href.includes("..")) {
            let folder = href.split("/").filter(Boolean).pop()
            //Getting meta-data of folder... 
            let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`)
            let response = await a.json();
            cardContainer.innerHTML = cardContainer.innerHTML + ` <div data-folder= "${folder}" class="card ">
                        <div class="play">
                            <img src="img/play-button-arrowhead.png" alt="">
                        </div>
                        <img src="songs/${folder}/cover.jpg" alt="">
                        <h2>${response.title}</h2>
                        <p>${response.description}</p>
                    </div>`

        }


       

    }

     //Event listener for card to load library...
        Array.from(document.querySelectorAll(".card")).forEach(e => {

            e.addEventListener("click", async item => {
                await getSongs(`songs/${item.currentTarget.dataset.folder}`)

                playMusic(songs[0])
            })
        })

}
async function main() {

    // Getting songs...
    await getSongs("songs/Jaana")
    playMusic(songs[0], true);



    //Display all the albums on the page...
    displayAlbums()



    //Adding functionality to play button...

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "img/pause-stroke-rounded.svg"
        }
        else {
            currentSong.pause()
            play.src = "img/play.svg"
        }
    })


    //Updating time duration...

    currentSong.addEventListener("timeupdate", () => {

        document.querySelector(".songDuration").innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)
            }`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";

    })

    //Adding functionality to seekbar to change song time..

    document.querySelector(".seekBar").addEventListener("click", e => {
        const seekBar = e.currentTarget;
        const rect = seekBar.getBoundingClientRect();

        const percent = (e.clientX - rect.left) / rect.width;

        document.querySelector(".circle").style.left = (percent * 100) + "%";

        currentSong.currentTime = currentSong.duration * percent;
    })

    //Event for space button to pause and play...
    document.addEventListener("keydown", e => {
        if (e.code === "Space") {
            e.preventDefault();

            if (currentSong.paused) {
                currentSong.play();
                play.src = "img/pause-stroke-rounded.svg";
            } else {
                currentSong.pause();
                play.src = "img/play.svg";
            }
        }

    });

    //Event listener for hamburger...
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0%"
    })


    //Event listener for close button..
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-130%"
    })

    //Event listener for previous button...
    previous.addEventListener("click", () => {

        let index = songs.indexOf(currentSong.currentSrc.split(`/${currFolder}/`)[1])

        currentSong.pause()

        if ((index - 1) >= 0)
            playMusic(songs[index - 1])

    })

    //Event listener for next button...
    next.addEventListener("click", () => {

        let index = songs.indexOf(currentSong.currentSrc.split(`/${currFolder}/`)[1])


        currentSong.pause()


        if ((index + 1) < songs.length)
            playMusic(songs[index + 1])

    })

    //Event listener for volume button...
    document.querySelector(".volume").getElementsByTagName("input")[0].addEventListener("change", (e) => {

        currentSong.volume = parseInt(e.target.value) / 100

    })

     //Event listener for volume mute button...
    document.querySelector(".volume").getElementsByTagName("img")[0].addEventListener("click", (e) => {

        if(e.currentTarget.src.includes("volume-high-stroke-rounded.svg")){
        currentSong.volume = 0;
        e.currentTarget.src = "img/volume-mute-02-stroke-rounded.svg"
        document.querySelector(".volume").getElementsByTagName("input")[0].value = 0;
        }
        else{
            e.currentTarget.src = "img/volume-high-stroke-rounded.svg"
            currentSong.volume = 0.10;
             document.querySelector(".volume").getElementsByTagName("input")[0].value = 10;
        }

    })




}

main()



