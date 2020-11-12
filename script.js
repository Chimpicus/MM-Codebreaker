
//settings
let colorblindMode = true
let difficulty = 5


let color = ['', 'red', 'blue', 'limegreen', 'yellow', 'orange', 'magenta' , 'cyan', 'white', 'aquamarine'];
let feedbackPinColor = ['' , 'limegreen', 'red']
let answer = []
let currentGuess = [0, 0, 0, 0]
let currentRow = 0 
let feedbackPins = []
let winner = false


function gameStart() {
    setAnswer();
}
   /* window.setTimeout(buttonFlashON(), 500)
        function buttonFlashON() {
            
            console.log("on")
        };
        window.setTimeout(500, buttonFlashOff()) 
        function buttonFlashOff() {
            document.getElementById('enter_0').style.backgroundColor ='darkgreen'
            console.log("off")
        };
        window.setTimeout(500, buttonFlashON());  
       };*/ // not working as intended

    
function setAnswer() {
    for (i = 0; i <= 3 ; i++) {
        
        let answerPin = document.getElementById('answer_' + i);
        randomNumber = Math.floor(Math.random() * ((difficulty + 2)- 1) + 1);
        answerPin = randomNumber;
        answer.push(answerPin);
        
    }
    console.log(answer); 
}

gameStart();


function colorCycle(id) {
    let guess = document.getElementById(id);
    let pinRow = id.slice(6, 7);
    let pin = guess.id.slice(8)
    if(pinRow == currentRow) {
        if (currentRow != pinRow) {
            number = 0
        }
        else if (currentGuess[pin] <= difficulty) {
            currentGuess[pin]++;  
                if(colorblindMode === true) {
                guess.innerText = currentGuess[pin];
                }
        }
        else {
        ;
        currentGuess[pin] = 1;
            if(colorblindMode === true) {
                guess.innerText = currentGuess[pin];
                };
    };
    guess.style.background = color[currentGuess[pin]];  
    //console.log("current guess = " + currentGuess)
};
};

//-------------------------------------------------------------work here VVVVVV --------------------------------------------------
function checkGuess() {
    currentFeedbackPin = 0
    if(currentGuess.toString() == answer.toString()){
            console.log("Winner!");
            feedbackPins.push(1, 1, 1, 1);
            winner = true;
            return;
    } 
    for (i = 0; i <= 3 ; i++) {
        if(currentGuess[i] == answer[i]){
            console.log('position match!')
            feedbackPins.push(1);
            feedbackPin = document.getElementById('feedback_' + currentRow + '_' + currentFeedbackPin);
            feedbackPin.style.background = feedbackPinColor[feedbackPins.shift()];
            currentFeedbackPin++;
            
        }
        else if (answer.includes(currentGuess[i])) {
            console.log("Color Match!");
            feedbackPins.push(2);
            feedbackPin = document.getElementById('feedback_' + currentRow + '_' + currentFeedbackPin);
            feedbackPin.style.background = feedbackPinColor[feedbackPins.shift()];
            currentFeedbackPin ++;
        }
        
        
        }
        
    };
    
    // write some code that compares the pins for matches based on position.
    
    
    
    
    
 

  
//--------------------------------------------------------------work here ^^^^^^^^ -------------------------------------------------

    function enter(id){
                
        let submitRow = id.slice(6, 7);
        let rowVerified = currentGuess.includes(0);

        if(currentRow == submitRow && rowVerified === false){
            document.getElementById(id).disabled = true;
            document.getElementById(id).style.background='red';
            window.setTimeout(buttonOff, 500);

            checkGuess();

            function buttonOff(){
                document.getElementById(id).style.background='darkred'
                currentGuess = [0, 0, 0, 0]
                feedbackPins = []
            };
        console.log("row "+ currentRow + " Submitted");
        if(winner == true){
            return
        }
        window.setTimeout(nextRow, 1000);
        function nextRow(){
            currentRow++;
            document.getElementById('enter_'+currentRow).style.background='lime'
            };
    }
    };


 


