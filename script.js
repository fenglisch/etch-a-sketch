// Create 8 x 8 grid

let btnCreateGrid = document.querySelector(".create-grid")
let instructions = document.querySelector(".instructions")
const container = document.querySelector(".container");
let gridSize = 0;
let allCells = 0;


function askForGridSize() {
    let userInput = +prompt("How many rows and columns shall the grid have?", "Enter one (!) number up to 100")
    if ( userInput < 1 || userInput > 100 || userInput == NaN) {
        alert("Your input was invalid. Please try again")
        askForGridSize()
    }
    else {
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

        allCells.forEach((cell) => {
            cell.addEventListener("mouseover", function() {
                if (isTimerRunning == false) {
                    startTimer();
                    isTimerRunning = true;
                }
                if (!cell.style.backgroundColor) {
                    cell.style.cssText = `background-color: rgb(${getRandomRgbValue()},${getRandomRgbValue()},${getRandomRgbValue()});`;
                    if (gridSize > 10) {
                        ++colorIterator;
                        counter.textContent = "Colorized squares: " + colorIterator + " of " + gridSize ** 2;
                        if (colorIterator == gridSize ** 2) {
                            stopTimer = true;
                            alert(`Congrats, you colorized all the squares in ${secs} seconds!`)
                            alert("For real though, how bored are you?")
                            alert("Just kiddin'... Create a new grid to play again.")
                        }

                    }

                }
                else if (cell.style.backgroundColor != "rgb(0, 0, 0)") {
                    let rgb = cell.style.backgroundColor;
                    let r = +rgb.replace(/rgb\((\d{1,3}).*/,"$1")
                    let g = rgb.replace(/rgb\(\d{1,3}, (\d{1,3}),.*/,"$1")
                    let b = rgb.replace(/rgb\(\d{1,3}, \d{1,3}, (\d{1,3})\)/,"$1")
                    cell.style.cssText = `background-color: rgb(${r - 25.5},${g - 25.5},${b - 25.5});`;
                    if (gridSize <= 10 && (r - 25.5) <= 30 && (g - 25.5) <=30 && (b - 25.5) <=30 ) {
                        cell.style.cssText = `background-color: rgb(0, 0, 0);`;
                        ++blackIterator
                        counter.textContent = "Black squares: " + blackIterator + " of " + gridSize ** 2;
                        if (blackIterator == gridSize ** 2) {
                            stopTimer = true;
                            alert(`Congrats, you turned all the squares black in ${secs} seconds!`)
                            alert("For real though, how bored are you?")
                            alert("Just kiddin'... Create a new grid to play again.")
                        }
                    }
        
                }
            })
        })
        
    }

}

btnCreateGrid.addEventListener("click", askForGridSize)


let blackIterator = 0;
let colorIterator = 0;
let isTimerRunning = false;
let stopTimer = false;
let timer = document.querySelector(".timer")
let counter = document.querySelector(".counter")


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
