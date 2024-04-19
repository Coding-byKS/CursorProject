let anywhere = document.querySelector("html");
let main = document.getElementsByClassName("main");
let image = document.querySelector("img");
let button = document.querySelector("#unmuteButton")
let start = document.querySelector(".start")
let audio = document.querySelector(".audio");
let score = document.querySelectorAll(".scoreContent")
let box = document.querySelector("#box")
let scoreCounter = 0;

score[1].innerHTML=scoreCounter;
let width = window.outerWidth;
// width = 1705; //need to figure out max value of clientX
let height = window.innerHeight;
let x, y;

randomGen();

function randomGen(){ /*function to generate cricket location and location 
                       of box near x,y where cursor changes style */

    x = Math.ceil(Math.random()*(width-150)); //-150 to account for cricket image width
    y = Math.ceil(Math.random()*(height-80)); //same here, reduced by 80
    console.log(x,y); //hint for location
    document.documentElement.style.setProperty("--left", `${x}px`);        
    document.documentElement.style.setProperty("--top", `${y}px`);
    document.documentElement.style.setProperty("--leftBox", `${x-100}px`);        
    document.documentElement.style.setProperty("--topBox", `${y-60}px`);
    audio.volume = 0.2;
    audio.playbackRate = 1.5;
}

button.addEventListener('click', function() {//get user permission to unmute
    audio.muted = false;
    if(audio.paused){audio.play();} //if audio is paused after last round
    if(document.body.style.cursor=="grab"){document.body.style.cursor="default"}/*change
    cursor style after last round*/
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
    let d = Math.sqrt((e.clientX-x)**2 + (e.clientY - y)**2);
    let xMax = Math.max(x, Math.abs(x-width))
    let yMax = Math.max(y, Math.abs(y-height))
    let dMax = Math.sqrt(xMax**2 + yMax**2);
    let vol = 0.2 + 0.8*Math.abs(1-d/dMax); //volume increases with decreasing distance
    let playback = 1.5 + 6*(Math.abs(1-d/dMax)**2); //squaring up for more gradual curve
    audio.playbackRate = playback;    
    audio.volume = vol;
    if(e.clientX>(x-100) && e.clientX<(x+100) && e.clientY>(y-60) && e.clientY<(y+60)){
        document.body.style.cursor="grab";                      
      }else{
          document.body.style.cursor="default";}            
}

box.addEventListener("click",()=>{/*event listener for click when cursor is
in the vicinity of the cricket */
  image.classList.add("imagedetails");        
  if(image.classList.contains("imagedetails")){   
        audio.pause();    
        scoreCounter++;
        score[1].innerHTML=scoreCounter;          
        setTimeout(() => {
          image.classList.remove("imagedetails");                          
          randomGen();
          document.getElementById("h1").innerHTML="Great Job!! Those crickets can be irritating"
          document.getElementById("p").innerHTML="";
          button.innerHTML = "Play Again?????"
          document.querySelector("dialog").showModal();              
          }, 2500);    
      } }        
    )

    
