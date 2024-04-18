let anywhere = document.querySelector("html");
let imageMoose = document.querySelector("img");
let button = document.querySelector("#unmuteButton")
let start = document.querySelector(".start")
const audio = document.querySelector(".audio");
let score = document.querySelectorAll(".scoreContent")
let scoreCounter = 0;
score[1].innerHTML=scoreCounter;
let width = window.outerWidth;
width = 1705; //need to figure out max value of clientX
let height = window.innerHeight;
let x, y;

randomGen();

function randomGen(){
x = Math.ceil(Math.random()*(width-150)); //-150 to account for cricket image width
y = Math.ceil(Math.random()*(height-80)); //same here, reduced by 80
console.log(x,y);
audio.volume = 0.2;
audio.playbackRate = 1.5;
}

button.addEventListener('click', function() {
    audio.muted = false;
    if(audio.paused){audio.play();}
    start.classList.add("hide");
  });
    
document.addEventListener("visibilitychange", event => {
    if (document.visibilityState === "visible") {
    audio.play();
  } else {
    audio.pause();
  }
});

anywhere.addEventListener("mousemove", handler);

function handler(e){
    console.log(x,y);  
    console.log(e.clientX, e.clientY); 
    let d = ((e.clientX-x)**2 + (e.clientY - y)**2)**0.5;
    let xMax = Math.max(x, Math.abs(x-width))
    let yMax = Math.max(y, Math.abs(y-height))
    let dMax = (xMax**2 + yMax**2)**0.5;
    let vol = 0.2 + 0.8*Math.abs(1-d/dMax);
    let playback = 1.5 + 4*(Math.abs(1-d/dMax)**2);
    audio.playbackRate = playback;    
    audio.volume = vol;

    if(e.clientX>(x-50) && e.clientX<(x+50) && e.clientY>(y-30) && e.clientY<(y+30)){
        document.documentElement.style.setProperty("--left", `${x}px`);        
        document.documentElement.style.setProperty("--top", `${y}px`);  
        imageMoose.classList.add("imagedetails");        
        if(imageMoose.classList.contains("imagedetails")){ 
              audio.pause();
              
              setTimeout(() => {
                imageMoose.classList.remove("imagedetails"); 
                setTimeout(()=>{scoreCounter++;
                score[1].innerHTML=scoreCounter;},1000)
                randomGen();
                document.getElementById("h1").innerHTML="Great Job!! Those crickets could be irritating"
                document.getElementById("p").innerHTML="";
                button.innerHTML = "Play Again?????"
                start.classList.remove("hide");
              }, 2500);

             }
  }
}