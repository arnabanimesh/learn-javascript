let countEl = document.getElementById("count-el")
let saveEl = document.getElementById("save-el")
document.body.style.backgroundSize="auto "+80*window.devicePixelRatio+"vw";

let count = 0

function increment() {
    count += 1
    countEl.innerText = count
}

function save() {
    if (count == 0) {}
    else if (saveEl.innerText == "") {
        saveEl.innerText += "Previous Entries: " + count
    } else {
    saveEl.innerText += " - " + count
    }
    count = 0
    countEl.innerText = count
}