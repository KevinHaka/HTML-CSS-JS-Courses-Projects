// Τα ερωτήματα 2 έως 7 θα απαντηθούν στο αρχείο αυτό

const newGuess = document.querySelector("#new-guess");
const message = document.querySelector("#message");
const lowHigh = document.querySelector("#low-high");
const checkButton = document.querySelector("#check");
const restartButton = document.querySelector("#restart");
const root = document.querySelector(":root");

// 2. να ορίσετε τους σχετικούς χειριστές συμβάντων
checkButton.addEventListener("click", checkGuess);
restartButton.addEventListener("click", restart);
newGuess.addEventListener("keyup", checkKey);

let previousGuesses = [];
let theGuess;
window.onload = newRandom();
newGuess.focus();
restartButton.style.display = "none";

function newRandom(){
/* 3. συνάρτηση που βρίσκει ένα τυχαίο αριθμό μεταξύ 1 και 100
 και τον εκχωρεί στη μεταβλητή theGuess */
    theGuess = Math.floor(Math.random() * 100) + 1;
}

function checkKey(e){
/* 4. συνάρτηση που όταν ο χρήστης πατήσει <<enter>>
 να καλεί τη συνάρτηση που αποτελεί τον κεντρικό ελεγκτή του παιχνιδιού.
 */
    (e.key === "Enter") ? checkGuess() : null;
}

function checkGuess(){
/* 5. Να ορίσετε συνάρτηση checkGuess η οποία καλείται είτε όταν ο χρήστης πατήσει <<enter>>
στο πεδίο "new-guess" είτε όταν πατήσει το πλήκτρο "check", η οποία είναι ο κεντρικός ελεγκτής,
καλεί τη συνάρτηση processGuess (η οποία αποφαίνεται για την ορθότητα του αριθμού) και κάνει
τις κατάλληλες ενέργειες για να μην μπορεί να εισάγει ο χρήστης νέο αριθμό ή να ανασταλεί η
λειτουργία του <<enter>>, εμφάνιση του πλήκτρου 'restart' και την εξαφάνιση του πλήκτρου 'check'
σε περίπτωση ολοκλήρωσης του παιχνιδιού. */
    let newValue = newGuess.value.trim();
    newGuess.value = "";

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
 /* 6.  Να ορίσετε συνάρτηση processGuess(newValue) η οποία καλείται από τη συνάρτηση checkGuess,
 περιέχει τη λογική του παιχνιδιού, ελέγχει αν η τιμή του χρήστη είναι σωστή, ή αν το παιχνίδι έχει
 τελειώσει χωρίς ο χρήστης να έχει βρει τον αριθμό, και επιστρέφει αντίστοιχα την τιμή "win", ή "lost",
 δημιουργεί και εμφανίζει τα κατάλληλα μηνύματα, αλλάζοντας το χρώμα του στοιχείου μηνυμάτων.
 Όλα τα μηνύματα του προγράμματος εμανίζονται από την processGuess().
 Σε περίπτωση που το παιχνίδι δεν έχει ακόμα τελειώσει, η συνάρτηση μπορεί είτε να μην επιστρέφει κάποια ιδιαίτερη τιμή,
 είτε να επιστρέφει κάποια τιμή της επιλογής σας */
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
/* 7. Να ορίσετε συνάρτηση restart η οποία καλείται όταν ο χρήστης πατήσει το πλήκτρο
'restart' και επανεκινεί τη διαδικασία */
    previousGuesses = [];
    newRandom();

    message.textContent = "";
    lowHigh.textContent = "";

    newGuess.disabled = false;
    newGuess.focus();

    message.style.background = "initial";
    checkButton.style.display = "inline-block";
    restartButton.style.display = "none";
}
