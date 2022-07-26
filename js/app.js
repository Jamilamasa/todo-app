// Current time
function getCurrtime() {
    const currHour = new Date().getHours();
    const currMinutes = new Date().getMinutes();
    let h;
    let m;
    let currTime;

    h = (currHour<10?'0':'') + currHour;
    m = (currMinutes<10?'0':'') + currMinutes;

    currTime = `${h}:${m}`;
    return currTime;
}
//Greeting 
function getTimeOfDay() {
    const currHour = new Date().getHours();
    let timeOfDay;
    if (currHour<12) {
        timeOfDay = 'morning';
    } else if (currHour>=12 && currHour<18 ) {
        timeOfDay = "afternoon"
    }
    else {
        timeOfDay = "evening"
    }
    return timeOfDay;
}

// Main content (time and greeting)
const time = document.querySelector(".time");
const greeting = document.querySelector(".greeting");


// Time
time.innerHTML = `<h1 class="lead-text">${getCurrtime()}</h1>`
// Greeting 
greeting.innerHTML = `<h2 class="m-heading">Good ${getTimeOfDay()}, Jamil.</h2>`

// Background 
document.addEventListener("DOMContentLoaded", changeBg)

function changeBg() {
    const container = document.querySelector('.container')
    const bgs = ['benz','city','dodge','masjid','masjid-2','nature'];
    let bgimg = 'background-image';
    const rand = Math.floor(Math.random() * bgs.length);
    const bg = bgs[rand];

    container.style.backgroundImage = `url('/img/${bg}.jpg')`

}















// let val;

// const today = new Date();
// val = today.getMinutes();
// console.log(val)
// let birthday = new Date("9/28/2001 10:25:34");
// birthday = new Date("September 28 2001");
// birthday = new Date("9-28-2001");

// val = today.getMonth();
// val = today.getDate();
// val = today.getDay();
// val = today.getFullYear();
// val = today.getHours();
// val = today.getMinutes();
// val = today.getSeconds();
// val = today.getMilliseconds();
// val = today.getTime();

// birthday.setMonth(2);
// birthday.setDate(12);
// birthday.setFullYear(2003);
// birthday.setHours(3);
// birthday.setMinutes(30);
// birthday.setSeconds(25);

// console.log(val);