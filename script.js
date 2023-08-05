let songIndex = 1; // abhi 0th song ko process kar rahe hai 

let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay")
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = document.getElementsByClassName("songItem");
let songitemPlay = document.getElementsByClassName("songitemPlay");
let songInfoName = document.getElementsByClassName("songInfoName")[0];

myProgressBar.value = 0; // jaise uper pehli baar website pe aayega to usse progress baar 0 mai milega

// jab hum play and pause button pe click karenge to ganna bajna and ruk jaana chahiye
masterPlay.addEventListener("click",function(){
    if(audioElement.paused){
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle")
        masterPlay.classList.add("fa-pause-circle")
        gif.style.opacity = 1;
        let e = document.getElementById(`${songIndex}`);
        e.classList.remove("fa-play-circle")
        e.classList.add("fa-pause-circle");
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle")
        masterPlay.classList.add("fa-play-circle")
        gif.style.opacity = 0;
        makeAllPause();
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
    {songName : "Get Ready To Fight",filePath : "songs/1.mp3", coverPath : "covers/1.jpg"},
    {songName : "Besabriyan - MS Dhoni",filePath : "songs/2.mp3", coverPath : "covers/2.jpg"},
    {songName : "Brother Anthem",filePath : "songs/3.mp3", coverPath : "covers/3.jpg"},
    {songName : "Chak Lein De",filePath : "songs/4.mp3", coverPath : "covers/4.jpg"},
    {songName : "Sulthan - KGF",filePath : "songs/5.mp3", coverPath : "covers/5.jpg"},
    {songName : "Tu Bhag Milkha",filePath : "songs/6.mp3", coverPath : "covers/6.jpg"},
    {songName : "Parwa Nahin",filePath : "songs/7.mp3", coverPath : "covers/7.jpg"},
    {songName : "Kar har Maidan Fateh",filePath : "songs/8.mp3", coverPath : "covers/8.jpg"},
    {songName : "Sutan - Premium",filePath : "songs/9.mp3", coverPath : "covers/9.jpg"},
]

// Iterating to every song item and setting its name , song and its cover
Array.from(songItems).forEach(function(element,index){
    element.getElementsByTagName("img")[0].src = songs[index].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[index].songName;
})


// Individual song item ke start and stop button pe click karne wala logic below mai hai 

const makeAllPause = ()=>{
    Array.from(songitemPlay).forEach((element)=>{
        element.classList.remove("fa-pause-circle")
        element.classList.add("fa-play-circle");
    })
}

Array.from(songitemPlay).forEach((element)=>{
    element.addEventListener("click",function(e){
        let alreadyPlay = e.target.classList.contains("fa-pause-circle");

        makeAllPause();

        songIndex = parseInt(e.target.id)
        audioElement.src = `songs/${songIndex}.mp3`;

        if(alreadyPlay){ // agar jispe click kara hai woh already play ho raha hai to usko band karo 
            e.target.classList.remove("fa-pause-circle")
            e.target.classList.add("fa-play-circle");
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove("fa-pause-circle")
            masterPlay.classList.add("fa-play-circle")
        }
        else{ // agar already play nhi ho raha to play karo 
            e.target.classList.remove("fa-play-circle")
            e.target.classList.add("fa-pause-circle");
            audioElement.play();
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
            gif.style.opacity = 1;
        }
        // hum play karna bolte hai to class ke hisab se pause karna hota hai and vice versa .
    })
})


document.getElementById("previous").addEventListener("click",function(){
    if(songIndex == 1){
        songIndex = 9;
    }
    else{
        songIndex -= 1;
    }
    makeAllPause();
    let e = document.getElementById(`${songIndex}`);

    audioElement.src = `songs/${songIndex}.mp3`;
    e.classList.remove("fa-play-circle")
    e.classList.add("fa-pause-circle");
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
})

document.getElementById("next").addEventListener("click",function(){

    if(songIndex == 9){
        songIndex = 1;
    }
    else{
        songIndex += 1;
    }
    makeAllPause();
    let e = document.getElementById(`${songIndex}`);

    audioElement.src = `songs/${songIndex}.mp3`;
    e.classList.remove("fa-play-circle")
    e.classList.add("fa-pause-circle");
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
})

// below event tak triggeer hoga jab song finish ho jayega
audioElement.addEventListener("ended", function(){
    makeAllPause();
    if(songIndex != 9){
        songIndex += 1;
        audioElement.currentTime = 0;
        masterPlay.classList.remove("fa-play-circle")
        masterPlay.classList.add("fa-pause-circle")
        let e = document.getElementById(`${songIndex}`);
        e.classList.remove("fa-play-circle")
        e.classList.add("fa-pause-circle");
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.play()
    }
    else{
        audioElement.currentTime = 0;
        masterPlay.classList.remove("fa-pause-circle")
        masterPlay.classList.add("fa-play-circle")
    }
});

audioElement.addEventListener("playing",function(){
    songInfoName.innerText = songs[songIndex-1].songName;
})