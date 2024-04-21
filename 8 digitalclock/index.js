const time = document.getElementById('time');
const timeFormat = document.getElementById('timeFormat');

document.addEventListener('DOMContentLoaded',()=>{
    setInterval(showTime,1000);
})

const showTime = ()=>{
    let date = new Date();
    //console.log(date);
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    //console.log(hrs+':'+mins+':'+secs);
    function pad(unit){
        return (unit<10)?`0${unit}`:`${unit}`
    }
    hrs = pad(hrs);
    mins = pad(mins);
    secs = pad(secs);

    if(hrs<12){
        timeFormat.innerHTML = 'AM';
    }
    else{
        timeFormat.innerHTML = 'PM';
    }
    hrs = hrs%12;
    hrs = pad(hrs);
    time.innerHTML = `${hrs} : ${mins} : ${secs}`;
}