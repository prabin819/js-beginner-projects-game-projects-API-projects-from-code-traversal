let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let resetBtn = document.getElementById("reset");
let timerDisplay = document.querySelector(".timerDisplay");

let msec = 0;
let secs = 0;
let mins = 0;

let timerId = null;

startBtn.addEventListener('click',()=>{
    if(timerId !== null){
        clearInterval(timerId);
    }
    timerId = setInterval(startTimer,10);
});
stopBtn.addEventListener('click',()=>{
    clearInterval(timerId);
});
resetBtn.addEventListener('click',()=>{
    clearInterval(timerId);
    timerDisplay.innerHTML = `00:00:00`;
    msec = secs = mins = 0;
});

function startTimer(){

    msec++;
    if(msec == 100){
        msec = 0;
        secs++;
    }
    if(secs == 60){
        secs = 0;
        mins++;
    }

    function pad(unit){
        return ("0"+unit).length > 2 ? unit : "0"+unit;
    }

    secs = pad(secs);
    mins = pad(mins);
    msec = pad(msec);

    timerDisplay.innerHTML = `${mins}:${secs}:${msec}`;
}