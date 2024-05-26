const play = document.getElementById("play")
const music = document.querySelector("audio")
const img = document.querySelector("img")
const title = document.getElementById("title")
const artist = document.getElementById("artist")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
let progress = document.getElementById("progress")
let total_duration = document.getElementById("duration")
let current_time = document.getElementById("current-time")
let progress_div = document.getElementById("progress-div")


let isplaying = false;

const songs = [
    {
        name: "satyam-1",
        title: "kesariya",
        artist: "arijit singh",
    },

    {
        name: "satyam-2",
        title: "heeriye",
        artist: "arijit singh",
    },

    {
        name: "satyam-3",
        title: "apna time aayega",
        artist: "divine",
    },

    {
        name: "satyam-4",
        title: "apna bana le",
        artist: "arijit singh",
    },
    {
        name: "satyam-5",
        title: "paisa hai toh",
        artist: "Vishal Dadlani"
    },
    {
        name: "satyam-6",
        title: "illuminati",
        artist: "Dabzee",
    },
    {
        name: "satyam-7",
        title: "born to shine",
        artist: "Diljit Dosanjh",
    },
    {
        name: "satyam-8",
        title: "Elevated",
        artist: "shubh",
    },
    {
        name: "satyam-9",
        title: "check kar",
        artist: "Parmish Verma",
    },
    {
        name: "satyam-10",
        title: "Angreji Beat",
        artist: "Honey Singh",
    },
]


// play function
const playmusic = () => {
    isplaying = true;
    music.play();
    play.classList.replace("ri-play-large-fill", "ri-pause-fill")
    img.classList.add("anime");
}

//pause function 
const pausemusic = () => {
    isplaying = false;
    music.pause();
    play.classList.replace("ri-pause-fill", "ri-play-large-fill")
    img.classList.remove("anime");
}


play.addEventListener("click", () => {
    if (isplaying) {
        pausemusic()
    }
    else {
        playmusic()
    }
})
const loadsong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "music/" + songs.name + ".mp3"
    img.src = "photo/" + songs.name + ".jpg"
}

let songidx = 0;

loadsong(songs[songidx]);

const nextsong = () => {
    songidx = (songidx + 1) % songs.length;
    loadsong(songs[songidx]);
    playmusic()

}

const prevsong = () => {
    songidx = (songidx - 1 + songs.length) % songs.length;
    loadsong(songs[songidx]);
    playmusic()
}

//progress bar work

music.addEventListener("timeupdate", (event) => {
    //   console.log(event)
    const { currentTime, duration } = event.target;
    // console.log(currentTime);
    // console.log(duration);

    let progresstime = (currentTime / duration) * 100;
    progress.style.width = `${progresstime}%`

    //music dduration update 

    let min_duration = Math.floor(duration / 60)
let sec_duration = Math.floor(duration % 60)
// console.log(min_duration)
// console.log(sec_duration)
if(sec_duration < 10){
    sec_duration = `0${sec_duration}`
}

if(duration){
    total_duration.textContent = `${min_duration}:${sec_duration}`
};

//current time update 


let min_current = Math.floor(currentTime / 60)
let sec_current = Math.floor(currentTime % 60)
// console.log(min_duration)
if(sec_current < 10 ){
    sec_current = `0${sec_current}`
}
// console.log(sec_current)
current_time.textContent = `${min_current}:${sec_current}`


});
progress_div.addEventListener("click", (evt)=>{
 const {duration} = music ;
  let move = (evt.offsetX / evt.target.clientWidth) * duration;
//   console.log(duration)
//   console.log(move)
music.currentTime = move ; 
})


music.addEventListener("ended" , nextsong);
next.addEventListener("click", nextsong);
prev.addEventListener("click", prevsong);

