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



    someDumbGlobal = "Bakana?!"

    solverObject = new Solver(8);


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

    drawBoard3(queensSliderPointer.value())

    frameRate(5)
    square(x, x, 10)
    x += 10



    // frameRate(frameRateSlider.value())


}


// for some reason, someDumbGlobal is not able to be accessed from the constructor. It is however, able to be accessed from the startButtonFunction



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
    startButton.id("startButton")
    startButton.mousePressed(startButtonFunction);

    // Restart Button
    let restartButton = createButton("Restart")
    restartButton.id("restartButton")
    restartButton.mousePressed(restartButtonFunction);
    restartButton.attribute("disabled", "") // by default disable the disable the restart button


    // Put everything in the [DOM] div element 
    controlPannel.child(createElement("h3", "Number of Queens"))
    controlPannel.child(queensSlider)
    controlPannel.child(createElement("h3", "Frame Rate (speed)"))
    controlPannel.child(frameRateSlider)

    controlPannel.child(startButton)
    controlPannel.child(restartButton)

}

// Note: trying to attach the solve function (the one inside the Solver class) to the start button has breaking effects. 
// Therefore I created a wrapper function to attach to the start button, if I am looking at this later confused.
function startButtonFunction() {

    let queensSliderPointer = select("#controlPannel #queensSlider")
    noLoop() // disable the draw loop

    disable()

    solverObject = new Solver(queensSliderPointer.value())
    solverObject.solve()
}

function restartButtonFunction() {

    console.log("Reset button pressed")
    console.log("this is my solver object " + solverObject)

    solverObject.end()
    enable()
}

function disable() {
    let queensSliderPointer = select("#controlPannel #queensSlider")
    let startButtonPointer = select("#controlPannel #startButton")
    let restartButtonPointer = select("#controlPannel #restartButton")

    queensSliderPointer.attribute("disabled", "")    // Disable the 
    startButtonPointer.attribute("disabled", "")
    restartButtonPointer.removeAttribute("disabled")
}

function enable() {
    let queensSliderPointer = select("#controlPannel #queensSlider")
    let startButtonPointer = select("#controlPannel #startButton")
    let restartButtonPointer = select("#controlPannel #restartButton")

    queensSliderPointer.removeAttribute("disabled")
    startButtonPointer.removeAttribute("disabled")
    loop()

    restartButtonPointer.attribute("disabled", "")

    console.log("enabled triggered")
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

async function drawBoard3(numberOfQueens) {

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





function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Solver {

    constructor(numberOfQueens) {
        this.numberOfQueens = numberOfQueens;

        this.board = [];
        for (let i = 0; i < this.numberOfQueens; i++) {
            this.board.push(0)
        }

        // colors
        this.checkColor = color(80, 224, 47)
        this.queensColor = color(20, 20, 117)

        // drawing related
        this.squareSize = (boardSize / this.numberOfQueens)
        this.yOffset = (screenSize - boardSize) / 2
        this.xOffset = controlPannelSize
        this.frameRateSlider = select("#controlPannel #frameRateSlider")

        this.terminate = false
    }


    async solve() {

        let curr = 0
        while (curr > -1 && !this.terminate) {
            // console.log(this.board)

            await drawBoard2(this.board)
            if (this.board[curr] >= this.numberOfQueens) {
                await this.drawQueens(curr - 1)
            }
            else { await this.drawQueens(curr) }
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

    end() {
        console.log("End Triggered")
        this.terminate = !this.terminate
        console.log(this.terminate)

    }

    async drawQueens(currentQueen) {
        fill(this.queensColor)
        for (let i = 0; i < currentQueen + 1; i++) {
            square(i * this.squareSize + this.xOffset, this.board[i] * this.squareSize + this.yOffset, this.squareSize)
        }
    }

    async isOkay(currentQueen) {
        // if (this.checkDiagUp(currentQueen) && this.checkLeft(currentQueen) && this.checkDiagDown(currentQueen)) {
        // if (await this.checkLeft(currentQueen)) {
        // if (await this.checkDiagUp(currentQueen) && await this.checkLeft(currentQueen)) {
        if (await this.checkDiagUp(currentQueen) && await this.checkLeft(currentQueen) && await this.checkDiagDown(currentQueen)) {
            return true
        }
        else { return false }
    }

    async checkDiagDown(currentQueen) {
        for (let i = 1; currentQueen - i > -1 && this.board[currentQueen] + i < this.numberOfQueens; i++) {
            fill(this.checkColor)
            square((currentQueen - i) * this.squareSize + this.xOffset, (this.board[currentQueen] + i) * this.squareSize + this.yOffset, this.squareSize)
            console.log("hello from checkdiagDown")

            await sleep(this.frameRateSlider.value())
            await drawBoard2(this.board)
            await this.drawQueens(currentQueen)

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
            square((currentCheck * this.squareSize) + this.xOffset, (this.board[currentQueen] * this.squareSize) + this.yOffset, this.squareSize)
            console.log("hello from checkleft")

            await sleep(this.frameRateSlider.value())
            await drawBoard2(this.board)
            await this.drawQueens(currentQueen)

            if (this.board[currentQueen] == this.board[currentCheck]) {
                return false
            }

        }
        return true
    }

    async checkDiagUp(currentQueen) {

        for (let i = 1; currentQueen - i > -1 && this.board[currentQueen] - i > -1; i++) {
            fill(this.checkColor)
            square((currentQueen - i) * (this.squareSize) + this.xOffset, ((this.board[currentQueen] - i) * this.squareSize) + this.yOffset, this.squareSize)

            await sleep(this.frameRateSlider.value())
            await drawBoard2(this.board)
            await this.drawQueens(currentQueen)

            if (this.board[currentQueen] - i == this.board[currentQueen - i]) {
                return false
            }
        }
        return true
    }

}

