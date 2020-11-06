//need to make a function that onclick cycles through numbers 1 to 6. UPDATE - Complete -
//need to make a function that converts numbers to colors and assigns them to the background color of the div. UPDATE - complete -
// need to create a function to change the next enter button to green. UPDATE - complete - 


//settings
let colorblindMode = true
let difficulty = 5


let number = 0
currentRow = 0 // to set active row
let color = ['', 'red', 'blue', 'limegreen', 'yellow', 'orange', 'magenta' , 'cyan', 'white', 'aquamarine'];

window.onLoad = gameStart()

//function gameStart() {
    //document.getElementById("enter_0").style.background='lime'};



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
        if(colorblindMode === true) {
            guess.innerText = number;
            }
        }
        else {
        number = 1;
    if(colorblindMode === true) {
        guess.innerText = number;
        };
    };
    guess.style.background = color[number];  
};
};


    function enter(id){
        
        let submitRow = id.slice(6, 7);

        if(currentRow == submitRow){
        document.getElementById(id).style.background='red';
        window.setTimeout(buttonOff, 500);
        function buttonOff(){
            document.getElementById(id).style.background='darkred'
        };
        console.log("row "+ currentRow + " Submitted");
        window.setTimeout(nextRow,1000)
        function nextRow(){
            currentRow++;
            document.getElementById('enter_'+currentRow).style.background='lime'
        };
        
        
       
        };
    };
        

        // enter button skips a row if double clicked, needs to be adressed.
        // need to create a function that generates a 4 digit code for the answer.
        // need to create a function that compares current row pins to answer on submit.
        // need to creat a function that provides feedback to feedback pins.
        // game start function that sets the answer and also turns frist row submit button on.

        // could store pin values in an object to solve the small bug of continuing number count over different pins.
