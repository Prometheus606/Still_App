const submitButton = document.getElementById("submit")
const timeView = document.getElementById("time")
const buttonR = document.getElementsByClassName("r")[0]
const buttonL = document.getElementsByClassName("l")[0]
const lastSideView = document.getElementById("last-side")
const lastTimeView = document.getElementById("last-time")
const timeDifferenceView = document.getElementById("time-difference")
const nextSideView = document.getElementById("next-side")
const errorView = document.getElementById("error-text")

//localStorage.clear()

submitButton.addEventListener("click", submit);
buttonR.addEventListener("click", () => setSide(buttonR));
buttonL.addEventListener("click", () => setSide(buttonL));


let lastSideText = localStorage.getItem("lastSideText");
let lastTimeText = localStorage.getItem("lastTimeText");
let lastTime = localStorage.getItem("lastTime");
let nextText = localStorage.getItem("nextText");

let lastSide;
let nextSide;
let time;
let timeDifference;

if (lastSideText === null || nextText === null || lastTime === null) {
    lastSideView.innerHTML = "Du hast noch keine Stillzeit eingetragen.";
    nextSideView.innerHTML = "";
    lastTimeView.innerHTML = "";
    timeDifferenceView.innerHTML = "";

} else {
    lastTime = {
        hours: parseInt(lastTime.split(":")[0]),
        minutes: parseInt(lastTime.split(":")[1])
    }

    calculateTimeDiffrence()

    lastSideView.innerHTML = lastSideText;
    lastTimeView.innerHTML = lastTimeText;
    timeDifferenceView.innerHTML = "<strong>Differenz:</strong> " + timeDifference.hours + " Stunden, " + timeDifference.minutes + " Minuten";
    nextSideView.innerHTML = nextText;
}

function calculateTimeDiffrence() {
    let currentTime = {
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
    }

    timeDifference = {
        hours: currentTime.hours - lastTime.hours,
        minutes: currentTime.minutes - lastTime.minutes,
    };
    if (timeDifference.hours < 0) {
        timeDifference.hours += 24
    }
    if (timeDifference.minutes < 0) {
        timeDifference.minutes += 60
        timeDifference.hours -= 1
    }
}


function submit() {
    time = timeView.value
    if (time === "") {
        console.log("Keine Zeit angegeben. Die AKtuelle Uhrzeit wird verwendet");
        let date = new Date()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        if (minutes <= 9) {
            minutes = "0" + minutes
        }
        time = hours + ":" + minutes
    } 

    if (lastSide === undefined) {
        console.log("Keine Seite angegeben");
        errorView.textContent = "Bitte eine Seite auswählen!"
        return
    }

    if (lastSide === "R") {
        lastSide = "Rechts"
        nextSide = "Links"
    } else {
        lastSide = "Links"
        nextSide = "Rechts"
    }

    lastTime = {
        hours: time.split(":")[0],
        minutes: time.split(":")[1]
    }

    calculateTimeDiffrence()

    
    lastSideView.innerHTML = "<strong>Letzte seite:</strong> " + lastSide
    lastTimeView.innerHTML = "<strong>Letzte Stillzeit:</strong> " + time + " Uhr"
    nextSideView.innerHTML = "Als nächstes anfangen mit: <br> <span>" + nextSide + "</span>"
    timeDifferenceView.innerHTML = "<strong>Differenz:</strong> " + timeDifference.hours + " Stunden, " + timeDifference.minutes + " Minuten"

    localStorage.setItem("lastSideText", lastSideView.innerHTML);
    localStorage.setItem("lastTime", time);
    localStorage.setItem("lastTimeText", lastTimeView.innerHTML);
    localStorage.setItem("nextText", nextSideView.innerHTML);

    

}

function setSide(button) {
    errorView.textContent = ""
    buttonL.style.border = "1px solid black";
    buttonR.style.border = "1px solid black";
    button.style.border = "2px solid rgb(206, 70, 70)";
    lastSide = button.textContent
}