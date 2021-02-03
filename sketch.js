// import { sleep } from "./sleep";

function setup() {

    screenSize = min(displayWidth, displayHeight)

    boardSize = .7 * screenSize
    controlPannelSize = .3 * screenSize

    createCanvas(screenSize + 500, screenSize)
    backgroundColor = 220
    background(backgroundColor);

    numQueens = 8

    setupControlPannel(controlPannelSize, boardSize, screenSize, 8)

    // setup board
    drawBoard(screenSize, boardSize, controlPannelSize)

    // Global that will be edited when modifying number of queens
    solverObject = new Solver(8);


    x = 10

    setupExtras()

}

function draw() {

    let queensSliderPointer = select("#controlPannel #queensSlider")
    drawBoard3(queensSliderPointer.value())
    drawAxis(queensSliderPointer.value())
    frameRate(5)
    square(x, 20, 10)
    x += 10
}


// // for some reason, someDumbGlobal is not able to be accessed from the constructor. It is however, able to be accessed from the startButtonFunction

function drawAxis(numberOfQueens) {

    eraseLabels()
    drawLabels(numberOfQueens)
}

function eraseLabels(numberOfQueens) {
    let yOffset = (screenSize - boardSize) / 2
    let squareSize = (boardSize / numberOfQueens)
    fill(backgroundColor)
    // erase column labels
    rect(controlPannelSize, yOffset - 50, boardSize, 50);
    // erase row labels
    rect(controlPannelSize + boardSize, yOffset, 60, boardSize);

}

function drawLabels(numberOfQueens) {
    let yOffset = (screenSize - boardSize) / 2
    let squareSize = (boardSize / numberOfQueens)
    let margin = 10
    fill(100)
    textSize(50)

    // columns
    for (let i = 0; i < numberOfQueens; i++) {
        text(String.fromCharCode(i + 97), (i * squareSize + controlPannelSize) + (squareSize / 2), yOffset - margin)
    }

    for (let i = 0; i < numberOfQueens; i++) {
        text((i + 1), (controlPannelSize + boardSize) + margin, i * squareSize + (squareSize / 2) + yOffset)
    }
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
    let squareSize = (boardSize / numberOfQueens)


    let black = color(130)
    let white = color(25)

    // drawboard
    for (let i = 0; i < numberOfQueens; i++) {
        for (let j = 0; j < numberOfQueens; j++) {
            if ((i + j) % 2 == 0) { fill(black) }
            else { fill(white) }
            square((i * squareSize + controlPannelSize), (j * squareSize) + yOffset, squareSize)
        }
    }
}

