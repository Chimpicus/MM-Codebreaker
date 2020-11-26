//settings
let colorblindMode = false;
let difficulty = 5;

let color = [
	'',
	'rgba(255, 5, 5, 0.6)',
	'rgba(5, 13, 255, 0.6)',
	'rgba(18, 255, 5, 0.6)',
	'rgba(255, 255, 5, 0.6)',
	'rgba(255, 101, 5, 0.6)',
	'rgba(201, 5, 255, 0.6)',
	'rgba(5, 226, 255, 0.6)',
	'rgba(199, 203, 189, 0.6)',
	'rgba(5, 255, 163, 0.6)'
];
let feedbackPinColor = [ '', 'limegreen', 'red' ];
let answer = [];
let currentGuess = [ 0, 0, 0, 0 ];
let currentRow = 0;
let feedbackPins = [];
let gameWon = false;

function togglePopup () {
	document.getElementById('help-box').classList.toggle('active');
}
function toggleWinner () {
	document.getElementById('winner').classList.toggle('active');
}
function toggleLoser () {
	document.getElementById('loser').classList.toggle('active');
}

function gameStart () {
	setAnswer();
}

function setAnswer () {
	for (i = 0; i <= 3; i++) {
		let answerPin = document.getElementById('answer_' + i);
		randomNumber = Math.floor(Math.random() * (difficulty + 2 - 1) + 1);
		answerPin = randomNumber;
		answer.push(answerPin);
	}
	console.log(answer);
}

gameStart();

function colorCycle (id) {
	let guess = document.getElementById(id);
	let pinRow = id.slice(6, 7);
	let pin = guess.id.slice(8);

	if (pinRow == currentRow) {
		if (currentRow != pinRow) {
			number = 0;
		} else if (currentGuess[pin] <= difficulty) {
			currentGuess[pin]++;
			if (colorblindMode === true) {
				guess.innerText = currentGuess[pin];
			}
		} else {
			currentGuess[pin] = 1;
			if (colorblindMode === true) {
				guess.innerText = currentGuess[pin];
			}
		}
		guess.style.background = color[currentGuess[pin]];
	}
}

function checkGuess () {
	let cloneAnswer = Array.from(answer);

	if (currentGuess.toString() == answer.toString()) {
		feedbackPins = [ 1, 1, 1, 1 ];
		updateFeedbackColor();
		winner();
		gameWon = true;
		setTimeout(toggleWinner, 300);
		return;
	} else {
		positionCheck(cloneAnswer);
		preCheck(cloneAnswer);
		colorCheck(cloneAnswer);
		updateFeedbackColor();
	}
}
function positionCheck (cloneAnswer) {
	for (i = 0; i < currentGuess.length; i++) {
		if (currentGuess[i] == cloneAnswer[i]) {
			feedbackPins.push(1);
			cloneAnswer[i] = 0;
			currentGuess[i] = 0;
		}
	}
}
function preCheck (cloneAnswer) {
	for (i = 0; i < currentGuess.length; i++) {
		if (cloneAnswer.includes(currentGuess[i]) == false) {
			currentGuess[i] = 0;
			console.log(currentGuess);
		}
	}
}
function colorCheck (cloneAnswer) {
	for (i = 0; i <= currentGuess.length; i++) {
		if (cloneAnswer.includes(currentGuess[i]) && currentGuess[i] != 0) {
			feedbackPins.push(2);
			currentGuess[i] = 0;
		}
	}
}

function updateFeedbackColor () {
	console.log(feedbackPins);
	for (i = 0; i < currentGuess.length; i++) {
		feedbackPin = document.getElementById('feedback_' + currentRow + '_' + i);
		feedbackPin.style.background = feedbackPinColor[feedbackPins.shift()];
	}
}

function enter (id) {
	let submitRow = id.slice(6, 7);
	let rowVerified = currentGuess.includes(0);

	if (currentRow == submitRow && rowVerified === false) {
		document.getElementById(id).disabled = true;
		document.getElementById(id).style.background = 'red';
		window.setTimeout(buttonOff, 500);

		checkGuess();

		function buttonOff () {
			document.getElementById(id).style.background = 'darkred';
			currentGuess = [ 0, 0, 0, 0 ];
			feedbackPins = [];
		}
		if (gameWon == true) {
			return;
		}

		window.setTimeout(nextRow, 1000);
		function nextRow () {
			currentRow++;
			if (currentRow == 10 && gameWon == false) {
				toggleLoser();
			} else {
				document.getElementById('enter_' + currentRow).style.background = 'lime';
			}
		}
	}
}

function winner () {
	for (i = 0; i <= 3; i++) {
		document.getElementById('answer_' + i).style.background = color[answer[i]];
		document.getElementById('answer_' + i).innerText = '';
		if (colorblindMode == true) {
			document.getElementById('answer_' + i).innerText = answer[i];
		}
	}
}
