const timer = document.querySelector('.timer');
const title = document.querySelector('.title');
const startBtn = document.querySelector('.startBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const resumeBtn = document.querySelector('.resumeBtn');
const resetBtn = document.querySelector('.resetBtn');
const pomoCountDisplay = document.querySelector('.pomoCountDisplay');

//making variables
const WORK_TIME = 25*60;
const BREAK_TIME = 5*60;
let timerID = null;
let oneRoundCompleted = false; // one round = worktime + breaktime
let totalCount = 0;
let paused = false;

//function to update title
const updateTitle = (msg)=>{
    title.textContent = msg;
}
//function to get time in secs
const getTimeinSecs = (timeString)=>{
    const[minutes,seconds] = timeString.split(':');
    return parseInt(minutes)*60+parseInt(seconds);
}
//function to save pomodoro counts to local storage
const saveLocalCount = ()=>{
    let counts = JSON.parse(localStorage.getItem('pomoCount'));
    counts !== null?counts++:counts = 1;
    counts++;
    localStorage.setItem('pomoCount',JSON.stringify(counts));
}

//Function to show completed pomodoro counts to screen
const showPomoCounts = ()=>{
    const count = JSON.parse(localStorage.getItem('pomoCount'));
    if(count > 0){
        pomoCountDisplay.style.display = 'flex';
        pomoCountDisplay.firstElementChild.textContent = count;
    }
}

//function to countdown
const countDown = (time)=>{
    return () =>{
        const mins = Math.floor(time/60).toString().padStart(2,'0');
        const secs = Math.floor(time%60).toString().padStart(2,'0');
        //timer.textContent = time;
        timer.innerHTML = `${mins}:${secs}`;
        time--;

        if(time<0){
            stopTimer();
            if(!oneRoundCompleted){
                timerID = startTimer(BREAK_TIME);
                oneRoundCompleted = true;
                updateTitle("Its break time!");
            }else{
                updateTitle("Completed one round of pomodoro timer");
                setTimeout(()=>{updateTitle("Start timer again!")},2000);
                totalCount++;
                saveLocalCount();
                showPomoCounts();
            }
        }
    }
}

//function to start timer
const startTimer = (startTime) =>{
    if(timerID !== null){
        stopTimer();
    }
    return setInterval(countDown(startTime),1000);
}

//function to stop timer
const stopTimer = () =>{
    clearInterval(timerID);
    timerID = null;
}

//Adding Event listener to start button
startBtn.addEventListener('click',()=>{
    timerID = startTimer(WORK_TIME);
    updateTitle("Its work time!");
});
//Adding Event listener to resetBtn button
resetBtn.addEventListener('click',()=>{
    stopTimer();
    timer.textContent = "25:00";
});
//Adding Event listener to pauseBtn button
pauseBtn.addEventListener('click',()=>{
    stopTimer();
    paused = true;
    updateTitle('Timer paused');
});
//Adding Event listener to resumeBtn button
resumeBtn.addEventListener('click',()=>{
    if(paused){
        const currentTime = getTimeinSecs(timer.textContent);
        timerID = startTimer(currentTime);
        paused = false;
        (!oneRoundCompleted) ? updateTitle('Its work time!'):updateTitle('Its break time!');
    }
    updateTitle('Timer paused');
});


showPomoCounts();