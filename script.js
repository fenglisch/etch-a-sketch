// Create 8 x 8 grid

let btnCreateGrid = document.querySelector(".create-grid")
let instructions = document.querySelector(".instructions")
const container = document.querySelector(".container");
let btnContainer = document.querySelector(".btn-container")
let gridSize = 0;
let allCells = 0;
let blackIterator = 0;
let colorIterator = 0;
let isTimerRunning = false;
let stopTimer = false;
let timer = document.querySelector(".timer")
let counter = document.querySelector(".counter")
let secs = 0;
let userInput = 0;
let id;


function askForGridSize() {
    userInput = +prompt("How many rows and columns shall the grid have?", "Enter one (!) number up to 100")
    if ( userInput < 1 || userInput > 100 || userInput == NaN) {
        alert("Your input was invalid. Please try again")
        askForGridSize()
    }
    else {
        createGrid()
    }
}

function createGrid() {
    if (userInput <= 10) {
        instructions.innerHTML = "<p>Make all the squares black as fast as you can!</p>"
    }
    else { instructions.innerHTML = "<p>Colorize all the squares as fast as you can!</p>" }
    container.innerHTML = "";
    secs = 0;
    isTimerRunning = false;
    stopTimer = false;
    timer.innerHTML = "";
    counter.innerHTML = "";
    btnContainer.removeChild(btnCreateGrid)

    gridSize = userInput;
    for (let i = 0; i < gridSize; i++) {
        let rowDiv = document.createElement('div');
        rowDiv.classList.add("row");
        rowDiv.style.height = 350 / gridSize + "px"
        container.appendChild(rowDiv);
        for (let j = 0; j < gridSize; j++) {
            let cellDiv = document.createElement('div');
            cellDiv.classList.add("cell");
            rowDiv.appendChild(cellDiv);
        }
    }
    allCells = document.querySelectorAll(".cell")
    assignAllCells()  
}

function assignAllCells() {
    allCells.forEach((cell) => {
        cell.addEventListener("mouseover", changeColors)
    })
}

function changeColors (e) {
    if (isTimerRunning == false) {
        startTimer();
        isTimerRunning = true;
    }
    if (!e.target.style.backgroundColor) {
        e.target.style.cssText = `background-color: rgb(${getRandomRgbValue()},${getRandomRgbValue()},${getRandomRgbValue()});`;
        if (gridSize > 10) {
            iterateColors()
        }
    }
    else if (e.target.style.backgroundColor != "rgb(0, 0, 0)") {
        let rgb = e.target.style.backgroundColor;
        let r = +rgb.replace(/rgb\((\d{1,3}).*/,"$1")
        let g = rgb.replace(/rgb\(\d{1,3}, (\d{1,3}),.*/,"$1")
        let b = rgb.replace(/rgb\(\d{1,3}, \d{1,3}, (\d{1,3})\)/,"$1")
        e.target.style.cssText = `background-color: rgb(${r - 25.5},${g - 25.5},${b - 25.5});`;
        if (gridSize <= 10 && (r - 25.5) <= 30 && (g - 25.5) <=30 && (b - 25.5) <=30 ) {
            iterateBlacks(e)
        }

    }
}



function startTimer() {
        id = setInterval(function(){ 
            ++secs;
            timer.textContent = "Time: " + secs + " sec"
            if(stopTimer == true){
                clearInterval(id);
            }
        },
            1000
        );
           
}

function getRandomRgbValue() {
    return Math.floor(Math.random() * 255) + 1;
}


function iterateColors() {
    ++colorIterator;
    counter.textContent = "Colorized squares: " + colorIterator + " of " + gridSize ** 2;
    if (colorIterator == gridSize ** 2) {
        stopTimer = true;
        alert(`Congrats, you colorized all the squares in ${secs} seconds!`)
        alert("For real though, how bored are you?")
        alert("Just kiddin'... Refresh the page to play again.")
    }
}

function iterateBlacks(e) {
    e.target.style.cssText = `background-color: rgb(0, 0, 0);`;
    ++blackIterator
    counter.textContent = "Black squares: " + blackIterator + " of " + gridSize ** 2;
    if (blackIterator == gridSize ** 2) {
        stopTimer = true;
        alert(`Congrats, you turned all the squares black in ${secs} seconds!`)
        alert("For real though, how bored are you?")
        alert("Just kiddin'... Refresh the page to play again.")
    }
}





btnCreateGrid.addEventListener("click", askForGridSize)





