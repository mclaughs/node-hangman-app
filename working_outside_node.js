//GLOBAL VARIABLES
// =================================
// arrays and variables for holding data
var wordOptions = ["red", "blue", "green", "yellow", "fuchsia", "cardinal", "tangerine"];
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
// game Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

//FUNCTIONS
// =================================

function startGame() {
  selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
  lettersInWord = selectedWord.split("");
  numBlanks = lettersInWord.length;

  // resets
  guessesLeft = 9;
  wrongLetters = [];
  blanksAndSuccesses = [];

  // populate random word with one blank per letter
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }

  //change html to reflect game status
  document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
  document.getElementById("numGuesses").innerHTML = guessesLeft;
  document.getElementById("winCounter").innerHTML = winCount;
  document.getElementById("lossCounter").innerHTML = lossCount;


  // testing / debugging
  console.log(selectedWord);
  console.log(lettersInWord);
  console.log(numBlanks);
  console.log(blanksAndSuccesses);
}

function checkLetters(letter) {
  // Check if letter exists in random word
  var isLetterInWord = false;

  for (var i = 0; i < numBlanks; i++) {
    if (selectedWord[i] === letter) {
      isLetterInWord = true;
    }
  }
  // Check where in the word the letter exists, then populate blanksAndSuccesses array

  if (isLetterInWord) {
    for (var i = 0; i < numBlanks; i++) {
      if (selectedWord[i] === letter) {
        blanksAndSuccesses[i] = letter;
      }
    }
  }
  else {
    wrongLetters.push(letter);
    guessesLeft--;
  }
  //testing and debugging
  console.log(blanksAndSuccesses);
}

function roundComplete() {
  console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left: " + guessesLeft);
  // post to html
  document.getElementById("numGuesses").innerHTML = guessesLeft;
  document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
  document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

  //check if user won
  if (lettersInWord.toString() === blanksAndSuccesses.toString()) {
    winCount++;
    alert("You Won!");
    // post to html
    document.getElementById("winCounter").innerHTML = winCount;
    startGame();
  }
  else if (guessesLeft === 0) {
    lossCount++;
    alert("You Lost!");
    // post to html
    document.getElementById("lossCounter").innerHTML = lossCount;
    startGame();
  }
}



// PROCESSES
// ================================
//initiates game at outset
startGame();

//register keyclicks
document.onkeyup = function(event) {
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  checkLetters(letterGuessed);
  roundComplete();
}
