console.log("Welcome to Spotify");

//Initialize the Variables
let  songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems =Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Jai Shri Ram", filepath: "songs/1.mp3", coverpath: "cover1.jpg"},
    {songName: "Ram Sita Ram", filepath: "songs/2.mp3", coverpath: "cover2.jpeg"},
    {songName: "Shivoham", filepath: "songs/3.mp3", coverpath: "cover3.jpeg"},
    {songName: "Priya Mithunam", filepath: "songs/4.mp3", coverpath: "cover4.jpeg"},
    {songName: "Huppa Huiya", filepath: "songs/5.mp3", coverpath: "cover5.jpeg"},
]


songItems.forEach((element, i)=>{
    
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    

})
// audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
   
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })

}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

    })
})