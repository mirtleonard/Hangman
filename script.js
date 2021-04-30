var words = ["house", "car", "hangman", "chair", "ear", "wall", "study", "road", "water", "childhood"];
var word, tries, hidden, guessedLetters;

function nextChar (letter) {
    return String.fromCharCode(letter.charCodeAt(0) + 1);
}

function startGame() {
    tries = 5;
    guessedLetters = 0;
    hidden = "";
    $("#alphabet").empty();

    for (var i = 'a'; i <= 'z'; i = nextChar(i)) {
        var button =  $('<button/>').attr({
            id : i,
            class : "btn-primary m-1",
            onclick : "checkLetter(id)",
        })  ;
        button.html(i);
        $("#alphabet").append(button);
    }

    word = words[Math.floor(Math.random() * 10)];
    for (var i = 0; i < word.length; i++)
        hidden += "_ ";
    $("#hiddenWord").text(hidden);
    $("#tries").text("Tries : " + tries);
}

function checkLetter (letter) {
    var lettersChecked = 0, update = "";
    for (var i = 0; i < word.length; i++)
        if (word[i] == letter && hidden[2 * i] != letter) {
            lettersChecked++;
            update += letter + " ";
        } else {
            update += hidden[2 * i] + " ";
        }
    if (lettersChecked > 0) {
        guessedLetters += lettersChecked; 
        hidden = update;
        letterGuessed(letter);
    } else {
        letterNotGuessed(letter);
    }
}

function letterGuessed(letter) {
    $("#" + letter).attr({
        class : "btn-success m-1"
    });
    $("#hiddenWord").text(hidden);
    if (guessedLetters == word.length) {
        $(".modal-title").text("Congratulation, you win!");
        $(".modal-body").text("The word was: " + word + " press Start Game to play again.");
        $("#modal").modal();
    }
}

function letterNotGuessed(letter) {
    $("#" + letter).attr ({
        class : "btn-danger m-1"
    });
    tries--;
    $("#tries").text("Tries : " + tries);
    if (tries == 0) {
        $(".modal-title").text("Try again!");
        $(".modal-body").text("The word was: " + word + " press Start Game to play again.");
        $("#modal").modal();
    }
}
