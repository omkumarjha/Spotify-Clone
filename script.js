let songIndex = 0; // abhi 0th song ko process kar rahe hai 

let audioElement = new Audio("songs/Get Ready To Fight.mp3");
let masterPlay = document.getElementById("masterPlay")
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = document.getElementsByClassName("songItem");

myProgressBar.value = 0; // jaise uper pehli baar website pe aayega to usse progress baar 0 mai milega

// jab hum play and pause button pe click karenge to ganna bajna and ruk jaana chahiye
masterPlay.addEventListener("click",function(){
    if(audioElement.paused){
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle")
        masterPlay.classList.add("fa-pause-circle")
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle")
        masterPlay.classList.add("fa-play-circle")
        gif.style.opacity = 0;
    }
})

// audioElement.duration -> yeh batata hai ki video total kitne sec ki hai 
// audioElement.currentTime -> yeh batata hai ki video current kis time and sec pe chal rahi hai 

// jab audio play hoga to uska time change hota rahega to ussi ko yaha listen kiya jaa raha hai 
audioElement.addEventListener("timeupdate",function(){
    let progress = (audioElement.currentTime/audioElement.duration)*100;
    myProgressBar.value = progress;
})

// jaise jaise progress baar change hoga waise waise hum audio element ke current time ko set karte rahenge 
myProgressBar.addEventListener("change",function(){
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})

// below array har eak song ka name , path and uska logo contain karta hai 
let songs = [
    {songName : "Get Ready To Fight",filePath : "songs/Get Ready To Fight.mp3", coverPath : "covers/bagghi.jpg"},
    {songName : "Besabriyan - MS Dhoni",filePath : "songs/besabriyan.mp3", coverPath : "covers/besabriyan.jpg"},
    {songName : "Brother Anthem",filePath : "songs/brotherAnthem.mp3", coverPath : "covers/Brother.jpg"},
    {songName : "Chak Lein De",filePath : "songs/Chak Lein De.mp3", coverPath : "covers/chak lein de.jpg"},
    {songName : "Sulthan - KGF",filePath : "songs/Sultan Kgf.mp3", coverPath : "covers/KGF.jpg"},
    {songName : "Tu Bhag Milkha",filePath : "songs/TuBhagMilkha.mp3", coverPath : "covers/milkha.jpg"},
    {songName : "Parwa Nahin",filePath : "songs/Parwah Nahin.mp3", coverPath : "covers/parwah nahin.jpg"},
    {songName : "Kar har Maidan Fateh",filePath : "songs/Kar Maidan.mp3", coverPath : "covers/sanju.jpg"},
    {songName : "Sutan - Premium",filePath : "songs/Sultan.mp3", coverPath : "covers/sultan.jpg"},
]

// Iterating to every song item and setting its name , song and its cover
Array.from(songItems).forEach(function(element,index){
    element.getElementsByTagName("img")[0].src = songs[index].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[index].songName;
})
