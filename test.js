//Hangman game word bank
var wordBank = ["stuff", "rhetoric", "device", "volume", "contigent"];
//random word from the word bank
var randomWordFromWordBank = wordBank[Math.floor(Math.random() * wordBank.length)]
//array of the alphabet
var arrayOfAlphabet = "abcdefghijklmnopqrstuvwxyz".split("")
//an object that holds the characters paired with its corresponding key code
var keyBindings = {};
for (var x = 97; x < 123; x++ ) {
	keyBindings[x] = arrayOfAlphabet[x - 97]
}

//for the display of letters
var letterDisplay = function () {
	var toAppend = [];
	for (var i = 0; i < arrayOfAlphabet.length; i++) {
		var $letterButton = $("<button>").attr({
			"type": "button",
			"id": arrayOfAlphabet[i],
			"class": "btn btn-default"
		}).text(arrayOfAlphabet[i]);
		toAppend.push($letterButton)
	}
	$("#letterDisplayContainer").append(toAppend)
}

//for the goal word
var goalWordDisplay = function (word) {
	var letters = word.split("");
	var toAppend = [];
	for (var i = 0; i < letters.length; i++) {
		var $goalWordDiv = $("<div>").text(letters[i]);
		toAppend.push($goalWordDiv) 
	}
	$("#currentWord").append(toAppend);
}

//function to generate a random word and print it to the page
var generateRandomWord = function () {
	var wordToGuess = randomWordFromWordBank;
	return wordToGuess
}


var hangmanGame = function () {	
	//generate the random goal word
	generateRandomWord();
	//to store the random goal word
	var goalWord = generateRandomWord();
	//var to store the progress of successful guesses on the goal word
	var progressOnWord = goalWord;
	console.log(goalWord)
	//for the score
	var score = 0;
	//for the goal
	var goal = goalWord.length;
	console.log(goal)
	//for attempts
	var attempts = 0; 
	//function that responds to user keyboard input
	var keyboardInputForHangman = function () {		
		$(window).keypress(function (event) {
			var key = event.which;
			//button to highlight when key is inputted
			var buttonToHighlight = "#" + keyBindings[key];
			//if a letter key has been inputted
			if (keyBindings.hasOwnProperty(key)) {
				console.log("The " + keyBindings[key] + " key was pressed");
				//check the key inputted against the letters in the goal array
				//Remember: strings can be treated like arrays
				var keyAgainstGoalLetter = goalWord.indexOf(keyBindings[key]);
					//if -1 is not returned (-1 is returned when the character is not found)
					if (keyAgainstGoalLetter !== -1) {
						//color the button green for a successful guess
						$(buttonToHighlight).css("background-color", "green");
						//for each character in the string
						for (var i = 0; i < goal; i++) {
							//
							if (keyBindings[key] === goalWord[i]) {
								var toRemove = new RegExp(keyBindings[key], "g");
								score++;
								console.log(score)
								goalWord = goalWord.replace(toRemove, "");
								console.log(goalWord)
							} 
						}
					} else {
						if ($(buttonToHighlight).css("background-color") !== "rgb(0, 128, 0)") {
							$(buttonToHighlight).css("background-color", "red");
							attempts++;
						}
					}
			}
		})
	}

	keyboardInputForHangman()
	letterDisplay();
}

$(document).ready(hangmanGame)


