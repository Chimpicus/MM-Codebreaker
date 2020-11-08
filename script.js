
//settings
let colorblindMode = true
let difficulty = 5

let answer = []
let currentGuess = [0, 0, 0, 0]
let number = 0
currentRow = 0 // to set active row
let color = ['', 'red', 'blue', 'limegreen', 'yellow', 'orange', 'magenta' , 'cyan', 'white', 'aquamarine'];



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
        
        answerPin = document.getElementById('answer_' + i);
        randomNumber = Math.floor(Math.random() * ((difficulty + 2)- 1) + 1);
        answerPin = randomNumber;
        answer.push(answerPin);
        
        document.getElementById('enter_0').style.backgroundColor ='lime';
    }
    console.log(answer); 
}


function colorCycle(id) {
    let guess = document.getElementById(id);
    let pinRow = id.slice(6, 7);
    let pin = guess.id.slice(8)
    if(pinRow == currentRow) {
        if (currentRow != pinRow) {
            number = 0
        }
        else if (number <= difficulty) {
            number++;
            currentGuess[pin] = number;
            
        if(colorblindMode === true) {
            guess.innerText = number;
            }
        }
        else {
        number = 1;
        currentGuess[pin] = number;
        
    if(colorblindMode === true) {
        guess.innerText = number;
        };
    };
    guess.style.background = color[number];  
    console.log("current guess = " + currentGuess)
};
};


    function enter(id){
        
        let submitRow = id.slice(6, 7);

        if(currentRow == submitRow){
        document.getElementById(id).style.background='red';
        window.setTimeout(buttonOff, 500);
        function buttonOff(){
            document.getElementById(id).style.background='darkred'
            currentGuess = [0, 0, 0, 0]
        };
        console.log("row "+ currentRow + " Submitted");
        window.setTimeout(nextRow, 1000);
        function nextRow(){
            currentRow++;
            document.getElementById('enter_'+currentRow).style.background='lime'
            };
        }
    };
        
/*function checkGuess (){
    for (i = 0; i <= 3 ; i++) {
        checkPin = document.getElementById('guess_' + currentRow + '_' + i )   
        console.log(checkPin.number)
    }
}*/ // doesnt work......



