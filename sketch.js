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

    // noLoop()
    x = 10

}

function draw() {

    // console.log(numQueens)

    let queensSliderPointer = select("#controlPannel #queensSlider")
    // let frameRateSlider = select("#controlPannel #frameRateSlider")

    // let numberOfQueens = queensSliderPointer.value()
    // drawBoard(screenSize, boardSize, controlPannelSize, numberOfQueens)
    // console.log(queensSliderPointer.value())

    frameRate(5)
    square(x, x, 10)
    x += 10



    // frameRate(frameRateSlider.value())


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
    let frameRateSlider = createSlider(100, 2000, 1000, 100)
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


function drawBoard(screenSize = screenSize, boardSize = boardSize, controlPannelOffset = controlPannelSize, numberOfQueens = 8) {

    let yOffset = (screenSize - boardSize) / 2

    let black = color(130)
    let white = color(25)

    // drawboard
    for (let i = 0; i < numberOfQueens; i++) {
        for (let j = 0; j < numberOfQueens; j++) {
            if ((i + j) % 2 == 0) { fill(black) }
            else { fill(white) }
            square((i * (boardSize / numberOfQueens) + controlPannelOffset), (j * (boardSize / numberOfQueens)) + yOffset, boardSize / numberOfQueens)
        }
    }
}

async function drawBoard2(board) {

    let numberOfQueens = board.length
    let yOffset = (screenSize - boardSize) / 2
    // set the drawing point to the top left of the board
    // translate(controlPannelSize, yOffset)

    let black = color(130)
    let white = color(25)

    // drawboard
    for (let i = 0; i < numberOfQueens; i++) {
        for (let j = 0; j < numberOfQueens; j++) {
            if ((i + j) % 2 == 0) { fill(black) }
            else { fill(white) }
            square((i * (boardSize / numberOfQueens) + controlPannelSize), (j * (boardSize / numberOfQueens)) + yOffset, boardSize / numberOfQueens)
        }
    }
}





// Note: trying to attach the solve function (the one inside the Solver class) to the start button has breaking effects. 
// Therefore I created a wrapper function to attach to the start button, if I am looking at this later confused.
function beginSolver() {

    // TODO
    // Disable start button to stop two solvers running simultaniously


    let s = new Solver()
    s.solve()
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Solver {

    constructor() {
        this.numberOfQueens; // default
        this.board;

        this.checkColor = color(80, 224, 47)
        this.queensColor = color(20, 20, 117)

        this.yOffset = (screenSize - boardSize) / 2
        this.xOffset = controlPannelSize
        this.frameRateSlider = select("#controlPannel #frameRateSlider")
    }


    async solve() {

        // square(300, 150, 20)

        let queensSliderPointer = select("#controlPannel #queensSlider")
        // let frameRateSlider = select("#controlPannel #frameRateSlider")

        this.numberOfQueens = queensSliderPointer.value()
        this.board = []
        for (let i = 0; i < this.numberOfQueens; i++) {
            this.board.push(0)
        }
        // console.log(this.board)

        let curr = 0
        while (curr > -1) {
            // console.log(this.board)

            await drawBoard2(this.board)
            await this.drawQueens(this.board, curr)
            await sleep(this.frameRateSlider.value())
            console.log("hello")

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

            else if (await this.isOkay(curr)) {
                curr += 1
            }
            else {
                this.board[curr] += 1
            }
        }
    }

    async drawQueens(board, currentQueen) {
        fill(this.queensColor)
        for (let i = 0; i < currentQueen + 1; i++) {
            square(i * (boardSize / this.numberOfQueens) + this.xOffset, board[i] * (boardSize / this.numberOfQueens) + this.yOffset, boardSize / this.numberOfQueens)
        }
    }

    async isOkay(currentQueen) {
        // if (this.checkDiagUp(currentQueen) && this.checkLeft(currentQueen) && this.checkDiagDown(currentQueen)) {
        // if (await this.checkLeft(currentQueen)) {
        if (await this.checkDiagUp(currentQueen) && await this.checkLeft(currentQueen)) {
            return true
        }
        else { return false }
    }

    async checkDiagDown(currentQueen) {
        // let yOffset = (screenSize - boardSize) / 2
        // let frameRateSlider = select("#controlPannel #frameRateSlider")
        for (let i = 1; currentQueen - i > -1 && this.board[currentQueen] + i < this.numberOfQueens; i++) {
            // let checkColor = color(80, 224, 47)
            // fill(checkColor)
            // // Current queen - number of sports to check back
            // square(((currentQueen - i) * (boardSize / this.numberOfQueens)) + controlPannelSize, this.board[currentQueen] + yOffset, boardSize / this.numberOfQueens)
            if (this.board[currentQueen] + i == this.board[currentQueen - i]) {
                return false
            }
            // await sleep(frameRateSlider.value())
            // console.log("hello from checkDiagDown")
        }
        return true
    }

    async checkLeft(currentQueen) {

        for (let currentCheck = currentQueen - 1; currentCheck > -1; currentCheck--) {
            fill(this.checkColor)
            square((currentCheck * (boardSize / this.numberOfQueens)) + this.xOffset, (this.board[currentQueen] * (boardSize / this.numberOfQueens)) + this.yOffset, (boardSize / this.numberOfQueens))
            console.log("hello from checkleft")

            await sleep(this.frameRateSlider.value())
            await drawBoard2(this.board)
            await this.drawQueens(this.board, currentQueen)

            if (this.board[currentQueen] == this.board[currentCheck]) {
                return false
            }

        }
        return true
    }

    async checkDiagUp(currentQueen) {

        for (let i = 1; currentQueen - i > -1 && this.board[currentQueen] - i > -1; i++) {
            fill(this.checkColor)
            square((currentQueen - i) * ((boardSize / this.numberOfQueens)) + this.xOffset, ((this.board[currentQueen] - i) * (boardSize / this.numberOfQueens)) + this.yOffset, (boardSize / this.numberOfQueens))

            await sleep(this.frameRateSlider.value())
            await drawBoard2(this.board)
            await this.drawQueens(this.board, currentQueen)

            if (this.board[currentQueen] - i == this.board[currentQueen - i]) {
                return false
            }
        }
        return true
    }

}


// for next time:
/*
    There are conflicts with drawing the board as well as trying to draw on the board since drawing the board is already in the draw function.
*/