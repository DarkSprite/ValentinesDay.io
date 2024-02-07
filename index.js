let countdownElement = document.getElementById("countdown");
let remainingElement = document.getElementById("remaining");
let gifElement = document.getElementById("gif");

let deadline = new Date('February 14, 2024 22:00:00');
let start = Date.now();
let correctOrientation = false;

if(window.innerHeight > window.innerWidth){
    document.getElementById("rotate").style = "display: flex;align-items: center;justify-content: center;height: 100vh;margin: 0;"
    document.getElementById("content").style = "display: none;"
    correctOrientation = false;
}else{
    document.getElementById("rotate").style = "display: none;"
    document.getElementById("content").style = "display: flex;align-items: center;justify-content: center;height: 100vh;margin: 0;"
    correctOrientation = true;
}

function zeroPad(number) {
    let str = number < 10 ? `0${number}` : number;
    if(str.length > 2) str = str.substr(str.length-2,2);
    if(str.length == 1) str += "0";
    return str;
}
let timeDifference = deadline - start;
let days = zeroPad(Math.floor(timeDifference / (1000 * 60 * 60 * 24)));
let hours = zeroPad(Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
let minutes = zeroPad(Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)));
let seconds = zeroPad(Math.floor((timeDifference % (1000 * 60)) / 1000));

if(timeDifference <= 0){
    days=0;
    hours=0;
    minutes=0;
    seconds=5;
}

countdownElement.innerHTML = `${days}:${hours}:${minutes}:${seconds}`;

let done = false;
let counting = false;

function endContdown(){
    done=true;
    countdownElement.innerHTML = "00:00:00:00";
    countdownElement.style = "top: 70vh;"
    remainingElement.style = "left: -50vw;"
    gifElement.style = "top: -40vh;"

    setTimeout(function() {
        document.getElementById("questions").style = "display: flex;align-items: center;justify-content: center;height: 100vh;margin: 0; opacity: 1; transition: 3s;";
    }, 500);
}

function countdown(){
    if(done == true) return;

    if(!counting){
        let deadline2 = new Date('February 3, 2024 22:00:00');
        let start2 = Date.now();
        let timeDifference2 = deadline2 - start2;
        days = zeroPad(Math.floor(timeDifference2 / (1000 * 60 * 60 * 24)));
        hours = zeroPad(Math.floor((timeDifference2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        minutes = zeroPad(Math.floor((timeDifference2 % (1000 * 60 * 60)) / (1000 * 60)));
        seconds = zeroPad(Math.floor((timeDifference2 % (1000 * 60)) / 1000));
    
        if(days == 0 && hours == 0 && minutes == 0 && seconds == 0){
            endContdown();
            return;
        }else if(days < 0){
            counting = true;
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 3;
        }
    
    }else{
        if(days == 0 && hours == 0 && minutes == 0 && seconds == 0){
            endContdown();
            return;
        }else if(correctOrientation){
            seconds--;
        }
    }
    seconds = zeroPad(seconds);
    minutes = zeroPad(minutes);
    hours = zeroPad(hours);
    days = zeroPad(days);

    countdownElement.innerHTML = `${days}:${hours}:${minutes}:${seconds}`;
}

function checks(){
    if(window.innerHeight > window.innerWidth){
        document.getElementById("rotate").style = "display: flex;align-items: center;justify-content: center;height: 100vh;margin: 0;"
        document.getElementById("content").style = "display: none;"
        correctOrientation = false;

    }else{
        document.getElementById("rotate").style = "display: none;"
        document.getElementById("content").style = "display: flex;align-items: center;justify-content: center;height: 100vh;margin: 0;"
        correctOrientation = true;
    }
    document.getElementById("bunnos").style.left= (screen.width / 2 - (screen.width - window.innerWidth)) + "px";
    document.getElementById("bunnos").style.top= (screen.height / 2 - (screen.height - window.innerHeight))  + "px";
}

function yes(){
    document.getElementById("questions").style = "display: flex;align-items: center;justify-content: center;height: 100vh;margin: 0; opacity: 0; transition: 2s;";
    setTimeout(function() {
        document.getElementById("questions").style = "display: flex;align-items: center;justify-content: center;height: 100vh;margin: 0; display:none;";
    }, 2000);
    setTimeout(function() {
        document.getElementById("reply").style = "display: flex;align-items: center;justify-content: center;height: 100vh;margin: 0; opacity: 1; transition: 0.2s;";
    }, 2800);
    setTimeout(function() {
        document.getElementById("borders").style="width:100vw;height: 100vh;position: fixed; transition: 0.2s; opacity: 0; pointer-events: none;";
        document.getElementById("black-screen").style = "position:fixed; left: 0vw; top: 0vw; width: 100vw; height: 100vh; background-color: black; transition: 0.2s;";
    }, 4400);
    setTimeout(function() {
        document.getElementById("bunnos").style="position: fixed; left: "+(screen.width / 2 - (screen.width - window.innerWidth)) + "px; top: "+(screen.height / 2 - (screen.height - window.innerHeight))  + "px; transition: 0.1s; opacity: 1; color:white; font-size:"+window.innerWidth/40+"px;";
    }, 5200);
}

function no(){
    document.getElementById("no").innerHTML = "<b>Try Again.</b>";
    setTimeout(function() {
        document.getElementById("no").innerHTML = "<b>No</b>";
    }, 1000);
}

setInterval(countdown, 1000);
setInterval(checks, 500);
