function setup() {

    screenSize = min(displayWidth, displayHeight)

    boardSize = .7 * screenSize
    controlPannelSize = .3 * screenSize

    createCanvas(screenSize, screenSize)
    background(220);

    numQueens = 8





    setupControlPannel(controlPannelSize, boardSize, screenSize, 8)

    // setup board
    drawBoard(screenSize, boardSize, controlPannelSize)



}

function draw() {

    // console.log(numQueens)

    let queensSliderPointer = select("#controlPannel #queensSlider")
    let frameRateSlider = select("#controlPannel #frameRateSlider")

    let numberOfQueens = queensSliderPointer.value()
    drawBoard(screenSize, boardSize, controlPannelSize, numberOfQueens)
    // console.log(queensSliderPointer.value())




    frameRate(frameRateSlider.value())


}

function setupControlPannel(controlPannelSize, boardSize, screenSize) {

    let yOffset = (screenSize - boardSize) / 2

    let backgroundColor = color(255, 204, 0);
    fill(backgroundColor)
    rect(0, yOffset, controlPannelSize, boardSize)


    // Control pannel div
    let controlPannel = createDiv("this is some text")
    controlPannel.id("controlPannel")
    controlPannel.style("height", boardSize + "px")
    controlPannel.style("border", "1px solid black")
    controlPannel.style("width", controlPannelSize + "px")
    controlPannel.position(0, 0 + yOffset)

    // controlPannel.parent("main")


    // Queens Slider
    let queensSlider = createSlider(1, 16, 8, 1)
    queensSlider.id("queensSlider")
    // queensSlider.position(controlPannelSize * .25, displayHeight * .25)
    numQueens = queensSlider.value()

    // frameRate Slider
    let frameRateSlider = createSlider(5, 60, 10, 5)
    frameRateSlider.id("frameRateSlider")

    // Start button
    let startButton = createButton("Start")
    startButton.mousePressed(beginSolver);



    // Put everything in the [DOM] div element 
    controlPannel.child(createElement("h3", "Number of Queens"))
    controlPannel.child(queensSlider)
    controlPannel.child(createElement("h3", "Frame Rate (speed)"))
    controlPannel.child(frameRateSlider)

    controlPannel.child(startButton)



    return numQueens

}


function drawBoard(screenSize, boardSize, controlPannelOffset, numberOfQueens = 8) {

    let yOffset = (screenSize - boardSize) / 2

    let black = color(130)
    let white = color(25)

    for (let i = 0; i < numberOfQueens; i++) {
        for (let j = 0; j < numberOfQueens; j++) {
            if ((i + j) % 2 == 0) { fill(black) }
            else { fill(white) }
            square((i * (boardSize / numberOfQueens) + controlPannelOffset), (j * (boardSize / numberOfQueens)) + yOffset, boardSize / numberOfQueens)

            // fill()
        }
    }
}


// Note: trying to attach the solve function (the one inside the Solver class) to the start button has breaking effects. 
// Therefore I created a wrapper function to attach to the start button, if I am looking at this later confused.
function beginSolver() {
    let s = new Solver()
    s.solve()
}

class Solver {

    constructor(name, year) {
        this.numberOfQueens; // default
        this.board;
    }


    solve() {
        let queensSliderPointer = select("#controlPannel #queensSlider")
        this.numberOfQueens = queensSliderPointer.value()
        this.board = []
        for (let i = 0; i < this.numberOfQueens; i++) {
            this.board.push(0)
        }
        // console.log(this.board)

        let curr = 0
        while (curr > -1) {
            // console.log(this.board)

            // if we found a solution
            if (curr >= this.numberOfQueens) {
                console.log(this.board)
                //  maybe make a pause or something?
                curr -= 1
                this.board[curr] += 1
            }

            if (this.board[curr] >= this.numberOfQueens) {
                // erase queen from space

                // reset queen reprsentation (do not redraw queen)
                this.board[curr] = 0
                // backtrack
                curr -= 1
                this.board[curr] += 1
            }

            else if (this.isOkay(curr)) {
                curr += 1
            }
            else {
                this.board[curr] += 1
            }
        }
    }

    isOkay(currentQueen) {
        if (this.checkDiagUp(currentQueen) && this.checkLeft(currentQueen) && this.checkDiagDown(currentQueen)) {
            // if (this.checkLeft(currentQueen)) {
            // if (this.checkDiagDown(currentQueen)){
            return true
        }
        else { return false }
    }

    checkDiagDown(currentQueen) {
        for (let i = 1; currentQueen - i > -1 && this.board[currentQueen] + i < this.numberOfQueens; i++) {
            if (this.board[currentQueen] + i == this.board[currentQueen - i]) {
                return false
            }
        }
        return true
    }

    checkLeft(currentQueen) {
        for (let i = 0; i < currentQueen; i++) {
            if (this.board[currentQueen] == this.board[i]) {
                return false
            }
        }
        return true
    }

    checkDiagUp(currentQueen) {

        for (let i = 1; currentQueen - i > -1 && this.board[currentQueen] - i > -1; i++) {
            if (this.board[currentQueen] - i == this.board[currentQueen - i]) {
                return false
            }
        }
        return true
    }

}