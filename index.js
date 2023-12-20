const submitButton = document.getElementById("submit")
const timeView = document.getElementById("time")
const buttonR = document.getElementsByClassName("r")[0]
const buttonL = document.getElementsByClassName("l")[0]
const lastSideText = document.getElementById("last-side")
const nextSideText = document.getElementById("next-side")
const errorText = document.getElementById("error-text")

//localStorage.clear()

let lastSide;
let nextSide;
let time;

submitButton.setAttribute("onclick", "submit()")
buttonR.setAttribute("onclick", "setSideR()")
buttonL.setAttribute("onclick", "setSideL()")


let lastText = localStorage.getItem("lastText");
let nextText = localStorage.getItem("nextText");

if (lastText === null || nextText === null) {
    lastSideText.textContent = "Du hast noch keine Stillzeit eingetragen.";
    nextSideText.textContent = "";
} else {
    lastSideText.textContent = lastText;
    nextSideText.textContent = nextText;
}


function submit() {
    time = timeView.value
    if (time === "") {
        console.log("Keine Zeit angegeben. Die AKtuelle Uhrzeit wird verwendet");
        let date = new Date()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        time = hours + ":" + minutes
    } 

    if (lastSide === undefined) {
        console.log("Keine Seite angegeben");
        errorText.textContent = "Bitte eine Seite auswählen!"
        return
    }

    if (lastSide === "R") {
        lastSide = "Rechts"
        nextSide = "Links"
    } else {
        lastSide = "Links"
        nextSide = "Rechts"
    }

    lastSideText.textContent = "Deine Letzte Stillzeit war um " + time + ", angefangen mit " + lastSide +".";
    nextSideText.textContent = "Als nächstes anfangen mit " + nextSide + "!";

    localStorage.setItem("lastText", lastSideText.textContent);
    localStorage.setItem("nextText", nextSideText.textContent);
}

function setSideR() {
    setSide(buttonR)
}

function setSideL() {
    setSide(buttonL)
}

function setSide(button) {
    buttonL.style.border = "1px solid black";
    buttonR.style.border = "1px solid black";
    button.style.border = "2px solid rgb(206, 70, 70)";
    lastSide = button.textContent
}