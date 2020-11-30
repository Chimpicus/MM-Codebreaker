let settings = {
	colorblindMode : false,
	difficulty     : 5
};

let game = {
	currentGuess : [ 0, 0, 0, 0 ],
	currentRow   : 0,
	answer       : [],
	gameWon      : false,
	gameStart    : () => {
		setAnswer();
	},

	setAnswer    : () => {
		for (i = 0; i <= 3; i++) {
			let answerPin = document.getElementById('answer_' + i);
			randomNumber = Math.floor(Math.random() * (settings.difficulty + 2 - 1) + 1);
			answerPin = randomNumber;
			game.answer.push(answerPin);
		}
		console.log(game.answer);
	},
	winner       : () => {
		for (i = 0; i <= 3; i++) {
			document.getElementById('answer_' + i).style.background = pins.color[game.answer[i]];
			document.getElementById('answer_' + i).innerText = '';
			if (settings.colorblindMode == true) {
				document.getElementById('answer_' + i).innerText = game.answer[i];
			}
		}
	}
};

let popups = {
	togglePopup  : () => {
		document.getElementById('help-box').classList.toggle('active');
	},
	toggleWinner : () => {
		document.getElementById('winner').classList.toggle('active');
	},
	toggleLoser  : () => {
		document.getElementById('loser').classList.toggle('active');
	}
};

let pins = {
	color            : [
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
	],
	feedbackPinColor : [ '', 'limegreen', 'red' ],

	feedbackPins     : [],

	colorCycle       : (id) => {
		let guess = document.getElementById(id);
		let pinRow = id.slice(6, 7);
		let pin = guess.id.slice(8);

		if (pinRow == game.currentRow) {
			if (game.currentRow != pinRow) {
				number = 0;
			} else if (game.currentGuess[pin] <= settings.difficulty) {
				game.currentGuess[pin]++;
				if (settings.colorblindMode === true) {
					guess.innerText = game.currentGuess[pin];
				}
			} else {
				game.currentGuess[pin] = 1;
				if (settings.colorblindMode === true) {
					guess.innerText = game.currentGuess[pin];
				}
			}
			guess.style.background = pins.color[game.currentGuess[pin]];
		}
	}
};

let submit = {
	checkGuess          : () => {
		let cloneAnswer = Array.from(game.answer);

		if (game.currentGuess.toString() == game.answer.toString()) {
			pins.feedbackPins = [ 1, 1, 1, 1 ];
			updateFeedbackColor();
			game.winner();
			game.gameWon = true;
			setTimeout(popups.toggleWinner, 300);
			return;
		} else {
			submit.positionCheck(cloneAnswer);
			submit.preCheck(cloneAnswer);
			submit.colorCheck(cloneAnswer);
			submit.updateFeedbackColor();
		}
	},

	positionCheck       : (cloneAnswer) => {
		for (i = 0; i < game.currentGuess.length; i++) {
			if (game.currentGuess[i] == cloneAnswer[i]) {
				pins.feedbackPins.push(1);
				cloneAnswer[i] = 0;
				game.currentGuess[i] = 0;
			}
		}
	},
	preCheck            : (cloneAnswer) => {
		for (i = 0; i < game.currentGuess.length; i++) {
			if (cloneAnswer.includes(game.currentGuess[i]) == false) {
				game.currentGuess[i] = 0;
				console.log(game.currentGuess);
			}
		}
	},

	colorCheck          : (cloneAnswer) => {
		for (i = 0; i <= game.currentGuess.length; i++) {
			if (cloneAnswer.includes(game.currentGuess[i]) && game.currentGuess[i] != 0) {
				pins.feedbackPins.push(2);
				game.currentGuess[i] = 0;
			}
		}
	},
	updateFeedbackColor : () => {
		console.log(pins.feedbackPins);
		for (i = 0; i < game.currentGuess.length; i++) {
			feedbackPin = document.getElementById('feedback_' + game.currentRow + '_' + i);
			feedbackPin.style.background = pins.feedbackPinColor[pins.feedbackPins.shift()];
		}
	},
	enter               : (id) => {
		let submitRow = id.slice(6, 7);
		let rowVerified = game.currentGuess.includes(0);

		if (game.currentRow == submitRow && rowVerified === false) {
			document.getElementById(id).disabled = true;
			document.getElementById(id).style.background = 'red';
			window.setTimeout(buttonOff, 500);

			submit.checkGuess();

			function buttonOff () {
				document.getElementById(id).style.background = 'darkred';
				game.currentGuess = [ 0, 0, 0, 0 ];
				pins.feedbackPins = [];
			}
			if (game.gameWon == true) {
				return;
			}

			window.setTimeout(nextRow, 1000);
			function nextRow () {
				game.currentRow++;
				if (game.currentRow == 10 && game.gameWon == false) {
					popups.toggleLoser;
				} else {
					document.getElementById('enter_' + game.currentRow).style.background = 'lime';
				}
			}
		}
	}
};

game.setAnswer();
