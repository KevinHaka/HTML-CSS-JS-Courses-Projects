const newGuess = document.querySelector("#new-guess");
const message = document.querySelector("#message");
const lowHigh = document.querySelector("#low-high");
const checkButton = document.querySelector("#check");
const restartButton = document.querySelector("#restart");
const root = document.querySelector(":root");

checkButton.addEventListener("click", checkGuess);
restartButton.addEventListener("click", restart);
newGuess.addEventListener("keyup", checkKey);

let previousGuesses = [];
let theGuess;
window.onload = newRandom();
newGuess.focus();
restartButton.style.display = "none";

function newRandom(){
    theGuess = Math.floor(Math.random() * 100) + 1;
}

function checkKey(e){
    (e.key === "Enter") ? checkGuess() : null;
}

function checkGuess(){
    let newValue = newGuess.value.trim();
    newGuess.value = "";
    newGuess.focus();

    if (newValue.length != 0) {
        let result = processGuess(newValue);
    
        if (result === "win" || result === "lost") {
            newGuess.disabled = true;
            checkButton.style.display = "none";
            restartButton.style.display = "inline-block";
        }
    }
}

function processGuess(newValue){
    let guess = Number(newValue);

    if (isFinite(guess)) {
        previousGuesses.push(guess)
        lowHigh.textContent = `Προηγούμενες μαντεψιές: ${previousGuesses.join(", ")}`;

        if (guess === theGuess) {
            message.textContent = "Μπράβο! Βρήκες τον αριθμό!";
            message.dataset.status = "win";
            return "win";

        } else if (guess < theGuess) {
            message.textContent = "Λάθος! Είσαι χαμηλότερα!";
            message.dataset.status = "wrong";
        } else {
            message.textContent = "Λάθος! Είσαι ψηλότερα!";
            message.dataset.status = "wrong";
        }
        
        if (previousGuesses.length >= 10) {
            message.textContent = `Τέλος παιχνιδιού! 'Εχασες! Ο αριθμός ήταν ${theGuess}.`;
            message.dataset.status = "lost";
            return "lost";
        }

    } else {
        message.textContent = "Δώσε αριθμό!";
        message.dataset.status = "wrong";
    }
}
function restart(){
    previousGuesses = [];
    newRandom();

    message.textContent = "";
    lowHigh.textContent = "";

    newGuess.disabled = false;
    newGuess.focus();

    message.removeAttribute("data-status");
    checkButton.style.display = "inline-block";
    restartButton.style.display = "none";
}
