//Hangman game word bank
var wordBank = ["stuff", "rhetoric", "device", "volume", "contigent", "social", "distortion", "kangaroo", "zipper", "youth", "broken", "alcohol", "versus", "horror", "entrance", "finite", "amazement", "mighty", "molecular", "signal", "paralysis", "eagle", "arrival", "creature", "drone", "shock", "curious", "fresh", "destructive", "predator", "shadow", "destiny", "honey", "cloudy", "babble", "contaminant", "halfway", "hopeless", "controller", "existing", "exhibit", "inhibit", "elaborate", "nightmare", "autopsy", "knuckle", "ultimate", "escalator", "virtual", "vice", "desire", "vindicate", "apprehension", "diligence", "willow", "various", "cheese", "hangover", "implant", "beyond", "behind", "computation", "confident", "funnel", "amber", "generous", "gallow", "positive", "grandiose", "balance", "capsule", "legend", "terminal", "technical", "tissue", "touch", "travel", "flavor", "fiction", "foreshadow", "metaphor", "analogy", "analog", "story", "lanter", "junior", "battery", "chief", "blast", "dramatic", "monologue", "dialogue", "needle", "assassin", "couple", "single", "plethora", "pigment", "shelter", "strife", "anxiety", "society", "fathom", "sinner", "gamble", "coward", "hero"];
console.log(wordBank.length);
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
			"class": "btn btn-default alphabetButtons"
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
		var $goalWordDiv = $("<div>").attr("class", "goalWordLetters " + letters[i]).text("_");
		toAppend.push($goalWordDiv) 
	}
	$("#currentWord").append(toAppend);
}

//function to generate a random word and print it to the page
var generateRandomWord = function () {
	var wordToGuess = randomWordFromWordBank;
	return wordToGuess
}

//For the gallow and hangman:
//variable to refer to the canvas
var canvas = document.getElementById("hangmanCanvas");
//function to draw lines:
//x1, y1 to begin the line and x2, y2 to end the line
var drawLine = function (x1, y1, x2, y2) {
	var line = canvas.getContext("2d");
	line.moveTo(x1, y1);
	line.lineTo(x2, y2);
	line.stroke();
}

//for the gallow
var gallow = function () {
	//y beam
	drawLine(15, 170, 15, 15);
	//x beam
	drawLine(10, 15, 150, 15);
	//should be diagonal
	drawLine(15, 30, 45, 15);
	//rope
	//drawLine(120, 15, 120, 25);
	// //neck and torso
	// drawLine(120, 45, 120, 100);
	// //left arm
	// drawLine(120, 50, 110, 70);
	// //righth arm 
	// drawLine(120, 50, 130, 70);
	// //left leg
	// drawLine(120, 100, 110, 120);
	// //right left
	// drawLine(120, 100, 130, 120)
};

//for the hangman head
var head = function (x, y, radius, start, stop) {
	var head = canvas.getContext("2d");
	head.beginPath();
	head.arc(x, y, radius, start, stop * Math.PI);
	head.stroke();
}

//a function to add each segment of the hangman for each missed attempt
var missedAttempts = function (attempts) {
	//an object to hold each segment of the hangman drawing
	var missedNumber = {
		//rope
		1: function () {
			drawLine(120, 15, 120, 25)
		},
		//head
		2: function () {
			head(120, 35, 10, 0, 2)
		},
		//neck and torso
		3: function () {
			drawLine(120, 45, 120, 100)
		},
		//left arm
		4: function () {
			drawLine(120, 50, 110, 70)
		},
		//right arm
		5: function () {
			drawLine(120, 50, 130, 70)
		},
		//left leg
		6: function () {
			drawLine(120, 100, 110, 120)
		},
		//right leg0
		7: function () {
			drawLine(120, 100, 130, 120)
		}
	};
	return missedNumber[attempts]();
}
	
var hangmanGame = function () {
	//to store the random goal word
	var goalWord = generateRandomWord();
	//a copy of the goal word
	var goalWordCopy = goalWord;
	//For the goal. When it reaches 0 the game is won.
	var goal = goalWord.length;
	//for attempts
	var attempts = 0; 
	//object to hold the letters used
	var lettersUsed = {};
	//function that responds to user keyboard input
	var keyboardInputForHangman = function () {	
		$(window).keypress(function (event) {
			var key = event.which;
			//button to highlight when key is inputted
			var buttonToHighlight = "#" + keyBindings[key];
			//if a letter key has been inputted,
			//if that letter has not been used,
			//if the goal has not been met, and if attempts are below 7
			if (keyBindings.hasOwnProperty(key) && !(lettersUsed.hasOwnProperty(key)) && goal !== 0 && attempts < 7) {
				console.log("The " + keyBindings[key] + " key was pressed");
				//create a property in the lettersUsed object
				lettersUsed[key] = keyBindings[key];
				//check the key inputted against the letters in the goal array
				//Remember: strings can be treated like arrays
				var keyAgainstGoalLetter = goalWord.indexOf(keyBindings[key]);
				//if -1 is not returned (-1 is returned when the character is not found)
				if (keyAgainstGoalLetter !== -1) {
					//color the button green for a successful guess
					$(buttonToHighlight).css("background-color", "green");
					//a variable regular expression to pass to .replace
					var keyInput = new RegExp(keyBindings[key], "g");
					//to update the goal word with the removed letters
					goalWord = goalWord.replace(keyInput, "");
					//to update the goal variable
					goal = goalWord.length;
					//to add the correct guess on the page
					for (var i = 0; i < goalWordCopy.length; i++) {
						if (keyBindings[key] === goalWordCopy[i]) {
							$("." + keyBindings[key]).text(keyBindings[key])
						}
					}
					//if goal is equal to 0
					if (goal === 0) {
						alert("Good job")
					}
				//otherwise, if -1 is returned 	
				} else {
					//and if the background color of the button is not green; that is, if a successful
					//guess has not been made on the button:
					if ($(buttonToHighlight).css("background-color") !== "rgb(0, 128, 0)") {
						//color the button red
						$(buttonToHighlight).css("background-color", "red");
						//increase the attempts counter
						attempts++;
						//draw a segment of the hangman
						missedAttempts(attempts);
						//if max attempts is reach, alert the game over message
						if (attempts === 7) {
							alert("Game over")
						}
					}
				}
			//otherwise, if the letters has been used already,
			//and the game is still in play
			} else if (lettersUsed.hasOwnProperty(key) && goal !== 0 && attempts < 7) {
				alert("You have used that letter already. Please try another.")
			}
		})
	}
	//the display of characters for the goal word
	goalWordDisplay(goalWord)
	console.log(goalWord)
	//keyboard input function
	keyboardInputForHangman();
	//letter display
	letterDisplay();
	//for the gallow
	gallow();
}

//function for if a button is clicked
var buttonClick = function () {
	//if an alphabet button is clicked
	$(".alphabetButtons").click(function () {
		alert("Please type a letter")
	});
	//for the JSFiddle Link
	$("#jsFiddleLink").click(function () {
		location.href="http://jsfiddle.net/windupdurb/35r8k89s/"
	})
	//for the Git Hub Link
	$("#gitHubLink").click(function () {
		location.href="https://github.com/Durbina/Hangman"
	})

}

$(document).ready(function () {
	hangmanGame();
	buttonClick();
})



