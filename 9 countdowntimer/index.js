const days = document.getElementById('days');
const hours = document.getElementById('hours');
const mins = document.getElementById('mins');
const secs = document.getElementById('secs');

function formatTime(time){
    return time<10?`0${time}`:`${time}`;
}

const countDown = (targetDate)=>{
    setInterval(()=>{updateCountDown(targetDate)},1000)
}

const updateCountDown = (deadline)=>{
    const currentTime = new Date();
    timeDifference = deadline - currentTime;
    //console.log(timeDifference);
    let calcSecs = Math.floor(timeDifference/1000)%60;
    let calcMins = Math.floor(timeDifference/1000/60)%60;
    let calcHours = Math.floor(timeDifference/1000/60/60)%60;
    let calcDays = Math.floor(timeDifference/1000/60/60/24);

    days.textContent = formatTime(calcDays);
    hours.textContent = formatTime(calcHours);
    mins.textContent = formatTime(calcMins);
    secs.textContent = formatTime(calcSecs);
}

const targetDate = new Date('April 20 2024 07:00');
countDown(targetDate);