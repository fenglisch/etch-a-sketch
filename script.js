// Create 8 x 8 grid

let btnCreateGrid = document.querySelector(".create-grid")
const container = document.querySelector(".container");

function askForGridSize() {
    let userInput = +prompt("How many rows and columns shall the grid have?", "Enter one (!) number up to 100")
    if ( userInput < 1 || userInput > 100 || userInput == NaN) {
        alert("Your input was invalid. Please try again")
        askForGridSize()
    }
    else {
        let gridSize = userInput;
        for (let i = 0; i < gridSize; i++) {
            let rowDiv = document.createElement('div');
            rowDiv.classList.add("row");
            container.appendChild(rowDiv);
            for (let j = 0; j < gridSize; j++) {
                let cellDiv = document.createElement('div');
                cellDiv.classList.add("cell");
                rowDiv.appendChild(cellDiv);
            }
        }
    }

}

btnCreateGrid.addEventListener("click", askForGridSize)
/*
for (let i = 0; i < 8; i++) {
    let rowDiv = document.createElement('div');
    rowDiv.classList.add("row");
    container.appendChild(rowDiv);
    for (let j = 0; j < 8; j++) {
        let cellDiv = document.createElement('div');
        cellDiv.classList.add("cell");
        rowDiv.appendChild(cellDiv);
    }
}
*/

let allCells = document.querySelectorAll(".cell")
let blackIterator = 0;
let isTimerRunning = false;
let stopTimer = false;
let timer = document.querySelector(".timer")
let blackSquaresCounter = document.querySelector(".black-squares-counter")


function getRandomRgbValue() {
    return Math.floor(Math.random() * 255) + 1;
}

let secs = 0;

function startTimer() {
        let id = setInterval(function(){ 
            ++secs;
            timer.textContent = "Time: " + secs + " sec"
            if(stopTimer == true){
                clearInterval(id);
               }
            return secs
        },
            1000
        );
           
}

allCells.forEach((cell) => {
    cell.addEventListener("mouseover", function() {
        if (isTimerRunning == false) {
            startTimer();
            isTimerRunning = true;
        }
        if (!cell.style.backgroundColor) {
            cell.style.cssText = `background-color: rgb(${getRandomRgbValue()},${getRandomRgbValue()},${getRandomRgbValue()});`;
        }
        else if (cell.style.backgroundColor != "rgb(0, 0, 0)") {
            let rgb = cell.style.backgroundColor;
            let r = +rgb.replace(/rgb\((\d{1,3}).*/,"$1")
            let g = rgb.replace(/rgb\(\d{1,3}, (\d{1,3}),.*/,"$1")
            let b = rgb.replace(/rgb\(\d{1,3}, \d{1,3}, (\d{1,3})\)/,"$1")
            cell.style.cssText = `background-color: rgb(${r - 25.5},${g - 25.5},${b - 25.5});`;
            if ((r - 25.5) <= 30 && (g - 25.5) <=30 && (b - 25.5) <=30 ) {
                cell.style.cssText = `background-color: rgb(0, 0, 0);`;
                blackIterator++
                blackSquaresCounter.textContent = "Black squares: " + blackIterator + " of 64";
                if (blackIterator == 64) {
                    stopTimer = true;
                    alert(`Congrats, you turned all the squares black in ${secs} seconds!`)
                    alert("For real though, how bored are you?")
                    alert("Just kiddin'... Refresh the page to play again.")
                }
            }

        }
    })
})
