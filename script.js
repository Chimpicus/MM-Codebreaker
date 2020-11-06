
//settings
let colorblindMode = false
let difficulty = 5

let number = 0
currentRow = 0 // to set active row
let color = ['', 'red', 'blue', 'limegreen', 'yellow', 'orange', 'magenta' , 'cyan', 'white', 'aquamarine'];

window.onLoad = gameStart()

function gameStart() {
    document.getElementById("enter_0").style.background='lime'};



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
        

        